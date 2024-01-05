import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { CiudadesFormComponent } from '../componentes/ciudades-form/ciudades-form.component';
import { ConexionFormComponent } from '../componentes/conexion-input/conexion-input.component';
import { ComponentBaseComponent } from '../componentes/component-base/component-base.component';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    ComponentBaseComponent,
    ConexionFormComponent,
    CiudadesFormComponent,
    MatDialogModule,
    FormsModule,
    MatSnackBarModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'conexiones';
  ciudades: string[] = [];

  constructor(
    private snackBar: MatSnackBar
  ) {}

  onCiudadAgregada(ciudad: string) {
    if (this.ciudades.includes(ciudad)) {
      this.mostrarAvisoError('Ciudad repetida');
      return;
    } else {
      this.ciudades.push(ciudad);
    }
  }

  eliminarCiudad(ciudad: any) {
    this.ciudades = this.ciudades.filter((c) => c !== ciudad);
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
