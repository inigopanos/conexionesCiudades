import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { CiudadesFormComponent } from '../componentes/ciudades-form/ciudades-form.component';
import { ConexionForm } from '../componentes/conexion-input/conexion-input.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, CiudadesFormComponent, ConexionForm],
  templateUrl: './app.component.html',
  styleUrl: './app.component.sass',
})
export class AppComponent {
  title = 'conexiones';
}
