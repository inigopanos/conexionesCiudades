import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgForm } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-conexion-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './conexion-input.component.html',
  styleUrl: './conexion-input.component.sass',
  providers: [{ provide: MatDialogRef, useValue: {} }],
})
export class ConexionFormComponent {
  tipoTransporteSeleccionado: string | undefined;

  constructor(private dialogRef: MatDialogRef<ConexionFormComponent>) {}

  agregarConexion(form: NgForm) {
    console.log('Nueva Conexion:', form.value);
  }

  close() {
    this.dialogRef.close();
  }
}
