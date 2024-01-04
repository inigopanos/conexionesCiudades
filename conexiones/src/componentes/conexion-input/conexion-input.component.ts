import { Component, Input, OnInit } from '@angular/core';
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

  conexiones: Conexion[] = [];
  nuevaConexion: any = {};

  origen: Ciudad | undefined;
  destino: Ciudad | undefined;
  transporte: Transporte | undefined;
  tipoTransporteSeleccionado: string | undefined;

  constructor(
    private dialogRef: MatDialogRef<ConexionFormComponent>,
    private ciudadService: CiudadService
  ) {}

  formatConexionString(conexion: Conexion): string {
    const partes = [conexion.origen, conexion.destino, conexion.transporte];

    return `${conexion.origen} ${conexion.destino} ${conexion.transporte}`;
  }

  agregarConexion(form: NgForm) {
    this.conexiones.push({ ...form.value });
    this.nuevaConexion = {};
    const conexionString = this.formatConexionString(form.value);
    console.log('Conexion recibida a string:', conexionString);

    form.resetForm();
  }

  private crearTransporte(
    tipo: string,
    values: any
  ): Tren | Coche | Avion | Barco {
    switch (tipo) {
      case 'tren':
        return new Tren(
          values.numTren,
          values.numAsientoTren,
          this.origen!,
          this.destino!
        );

      case 'avion':
        return new Avion(
          values.numAsientoAvion,
          values.numVuelo,
          this.origen!,
          this.destino!
        );

      case 'coche':
        return new Coche(values.matricula, this.origen!, this.destino!);

      case 'barco':
        return new Barco(values.numBarco, this.origen!, this.destino!);

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
