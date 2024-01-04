import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgForm } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Conexion } from '../../clases/constructor';

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

  tipoTransporteSeleccionado: string | undefined;
  conexiones: Conexion[] = [];
  nuevaConexion: any = {};

  constructor(private dialogRef: MatDialogRef<ConexionFormComponent>) {}

  formatConexionString(conexion: Conexion): string {
    return `${conexion.origen} ${conexion.destino} ${conexion.transporte}`;
  }

  agregarConexion(form: NgForm) {
    console.log('Nueva Conexion:', form.value);
    this.conexiones.push({ ...form.value });
    console.log('Conexiones:', this.conexiones);
    form.resetForm();
    this.nuevaConexion = {};

    const conexionString = this.formatConexionString(form.value);
    console.log('Conexión formateada:', conexionString);
  }

  eliminarConexion(index: number) {
    this.conexiones.splice(index, 1);
  }

  close() {
    this.dialogRef.close();
  }
}
