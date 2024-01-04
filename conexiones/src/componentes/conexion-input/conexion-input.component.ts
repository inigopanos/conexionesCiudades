import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgForm } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Conexion, Ciudad, Transporte } from '../../clases/constructor';
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
  constructor(private dialogRef: MatDialogRef<ConexionFormComponent>) {}

  conexiones: Conexion[] = [];
  nuevaConexion: any = {};

  origen: Ciudad | undefined;
  destino: Ciudad | undefined;
  transporte: Transporte | undefined;
  tipoTransporteSeleccionado: string | undefined;

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

  eliminarConexion(index: number) {
    this.conexiones.splice(index, 1);
  }

  close() {
    this.dialogRef.close();
  }
}
