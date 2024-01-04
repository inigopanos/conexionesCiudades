import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-ciudades-form',
  standalone: true,
  imports: [FormsModule,],
  templateUrl: './ciudades-form.component.html',
  styleUrl: './ciudades-form.component.sass'
})
export class CiudadesFormComponent {

  agregarCiudades(form: NgForm){
    const origen = form.value.origen;
    const destino = form.value.destino;

    console.log('Ciudad Origen:', origen)
    console.log('Ciudad Destino:', destino)
    console.log('Todo:', form.value)
  }
}
