import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CiudadService } from '../../servicios/ciudad.service';

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
      this.ciudadService.agregarCiudad(this.nuevaCiudad)
      form.resetForm();
      this.nuevaCiudad = '';
    }
  }

  eliminarCiudad(ciudad: string) {
    this.ciudadService.eliminarCiudad(ciudad)
    this.ciudades = this.ciudades.filter((c) => c !== ciudad);
  }

}
