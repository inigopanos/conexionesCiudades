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

@Component({
  selector: 'app-conexion-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './conexion-input.component.html',
  styleUrl: './conexion-input.component.sass',
  providers: [{ provide: MatDialogRef, useValue: {} }],
})
export class ConexionFormComponent {
  @Input() ciudades: string[] = [];

  conexiones: Conexion[] = []
  conexionesString: string[] = [];
  nuevaConexion: any = {};

  origen: Ciudad | undefined;
  destino: Ciudad | undefined;
  transporte: Transporte | undefined;
  tipoTransporteSeleccionado: string | undefined;

  constructor(
    private dialogRef: MatDialogRef<ConexionFormComponent>,
    private ciudadService: CiudadService
  ) {}



  agregarConexion(form: NgForm) {
    const conexion = this.crearConexion(this.tipoTransporteSeleccionado!, form.value);
    this.conexiones.push({...form.value});
    this.conexionesString.push(conexion.toString());
    this.ciudadService.agregarConexionesString(conexion.toString())
        
    this.nuevaConexion = {};

    form.resetForm();
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

  eliminarConexion(index: number) {
    this.conexiones.splice(index, 1);
  }

  close() {
    this.dialogRef.close();
  }
}
