import { Component, Input } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CiudadService } from '../../servicios/ciudad.service';

@Component({
  selector: 'app-component-base',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './component-base.component.html',
  styleUrl: './component-base.component.sass'
})
export class ComponentBaseComponent {
  @Input() ciudades: string[] = [];

  resultado: string = '';
  constructor(private ciudadService: CiudadService) {}

  ciudadOrigenDestino(form: NgForm){
    this.ciudadService.setOrigenDestino(form.value.origen, form.value.destino);
  }

  buscarRuta(form: NgForm){
    // Se pasan las ciudades de origen y destino
    this.ciudadOrigenDestino(form);

    // Se llama al servicio para que cree la red de ciudades
    let mensaje = this.ciudadService.buscarRuta();
    console.log('Mensaje:', mensaje);
  }

}
