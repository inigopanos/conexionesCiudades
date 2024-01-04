import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-ciudades-form',
  standalone: true,
  imports: [FormsModule,],
  templateUrl: './ciudades-form.component.html',
  styleUrl: './ciudades-form.component.sass'
})
export class CiudadesFormComponent {
  @Output() ciudadAgregada = new EventEmitter<string>();
  nuevaCiudad: string = '';
  ciudades: string[] = []

  agregarCiudades(form: NgForm){
    if (form.valid) {
      this.ciudades.push(this.nuevaCiudad)
      this.ciudadAgregada.emit(this.nuevaCiudad);
      form.resetForm();
      this.nuevaCiudad = '';
    }
  }
}
