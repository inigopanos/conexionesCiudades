import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { CiudadesFormComponent } from '../componentes/ciudades-form/ciudades-form.component';
import { ConexionFormComponent } from '../componentes/conexion-input/conexion-input.component';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ConexionFormComponent, CiudadesFormComponent, MatDialogModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.sass',
})
export class AppComponent {
  title = 'conexiones';
  ciudades: string[] = [];

  onCiudadAgregada(ciudad: string){
    this.ciudades.push(ciudad);
    console.log('Ciduades:', this.ciudades);
  }
}
