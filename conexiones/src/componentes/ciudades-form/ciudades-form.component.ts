import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CiudadService } from '../../servicios/ruta.service';

@Component({
  selector: 'app-ciudades-form',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './ciudades-form.component.html',
  styleUrl: './ciudades-form.component.sass'
})
export class CiudadesFormComponent {
  constructor(private ciudadService: CiudadService) {}
  @Output() ciudadAgregada = new EventEmitter<string>();
  nuevaCiudad: string = '';
  ciudades: string[] = []

  agregarCiudades(form: NgForm){
  
    if (form.valid) {
      this.ciudadAgregada.emit(this.nuevaCiudad);
      form.resetForm();
      this.nuevaCiudad = '';
    }
  }

  eliminarCiudad(ciudad: any) {
    this.ciudades = this.ciudades.filter((c) => c !== ciudad);
  }

}
