import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgForm } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import {
  Conexion,
  Ciudad,
  Transporte,
  Tren,
  Avion,
  Coche,
  Barco,
} from '../../clases/constructor';
import { CiudadService } from '../../servicios/ciudad.service';
import { FormModule } from '@coreui/angular';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';


@Component({
  selector: 'app-conexion-form',
  standalone: true,
  imports: [CommonModule, FormsModule, FormModule, MatSnackBarModule],
  templateUrl: './conexion-input.component.html',
  styleUrl: './conexion-input.component.scss',
  providers: [{ provide: MatDialogRef, useValue: {} }],
})
export class ConexionFormComponent {
  @Input() ciudades: string[] = [];

  valores: string[] = []; 
  conexionPattern: RegExp = /^[a-zA-Z0-9]+$/;

  conexiones: Conexion[] = [];
  conexionesString: string[] = [];
  nuevaConexion: any = {};

  origen: Ciudad | undefined;
  destino: Ciudad | undefined;
  transporte: Transporte | undefined;
  tipoTransporteSeleccionado: string | undefined;

  constructor(
    private dialogRef: MatDialogRef<ConexionFormComponent>,
    private ciudadService: CiudadService,
    private snackBar: MatSnackBar
  ) {}

  agregarConexion(form: NgForm) {
    const valores = form.value;
    for (const key in valores){
      if (valores.hasOwnProperty(key) && (valores[key] === undefined || !this.conexionPattern.test(valores[key])))
      {
        this.mostrarAvisoError('Introduzca un valor válido');
        return;
      }
    }

    const conexion = this.crearConexion(this.tipoTransporteSeleccionado!, form.value);
    this.conexiones.push({...form.value});
    this.conexionesString.push(conexion.toString());
    this.ciudadService.agregarConexionesString(conexion.toString())
        
    this.nuevaConexion = {};

    form.resetForm();

    this.mostrarAviso('Conexión agregada correctamente');
  }

  private crearConexion(
    tipo: string,
    values: any,
    
  ): Tren | Coche | Avion | Barco {
    switch (tipo.toLowerCase()) {
      case 'tren':
        return new Tren(
          values.numTren,
          values.numAsientoTren,
          values.origen,
          values.destino
        );

      case 'avion':
        return new Avion(
          values.numVuelo,
          values.numAsientoAvion,
          values.origen,
          values.destino
        );

      case 'coche':
        return new Coche(values.matricula, values.origen, values.destino);

      case 'barco':
        return new Barco(values.numBarco, values.origen, values.destino);

      default:
        throw new Error(`Tipo de transporte no reconocido: ${tipo}`);
    }
  }

  mostrarAvisoError(mensaje: string) {
    this.snackBar.open(mensaje, 'Cerrar', {
      duration: 3000,
    });
  }

  mostrarAviso(mensaje: string) {
    this.snackBar.open(mensaje, 'Cerrar', {
      duration: 3000,
    });
  }

  eliminarConexion(index: number) {
    this.conexiones.splice(index, 1);
  }

  close() {
    this.dialogRef.close();
  }
}
