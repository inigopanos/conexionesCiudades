import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule, NgForm, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CiudadService } from '../../servicios/ciudad.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-ciudades-form',
  standalone: true,
  imports: [FormsModule, CommonModule, MatSnackBarModule],
  templateUrl: './ciudades-form.component.html',
  styleUrl: './ciudades-form.component.scss',
})
export class CiudadesFormComponent {
  constructor(
    private ciudadService: CiudadService,
    private snackBar: MatSnackBar
  ) {}

  @Output() ciudadAgregada = new EventEmitter<string>();
  nuevaCiudad: string = '';
  ciudadPattern = /^[a-zA-Z ]*$/;
  mensajeErrorCiudad = 'Ingresa solo caracteres alfabéticos.';
  ciudades: string[] = [];
  ciudadesAgregadas: string[] = [];

  agregarCiudades(form: NgForm) {
    if (!this.ciudadPattern.test(this.nuevaCiudad) || this.nuevaCiudad === '') {
      this.mostrarAvisoError(this.mensajeErrorCiudad);
      return;
    }

    this.ciudadAgregada.emit(this.nuevaCiudad);
    this.ciudadService.agregarCiudad(this.nuevaCiudad);
    this.ciudadesAgregadas.push(this.nuevaCiudad);
    form.resetForm();
    this.nuevaCiudad = '';

    this.mostrarAviso('Ciudad agregada correctamente');
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
}
