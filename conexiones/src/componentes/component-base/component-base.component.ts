import { Component, Input } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CiudadService } from '../../servicios/ciudad.service';
import { FormModule } from '@coreui/angular';

@Component({
  selector: 'app-component-base',
  standalone: true,
  imports: [CommonModule, FormsModule, FormModule],
  templateUrl: './component-base.component.html',
  styleUrl: './component-base.component.scss'
})
export class ComponentBaseComponent {
  @Input() ciudades: string[] = [];
  mensaje: string = '';
  resultado: string = '';
  ciudadOrigen: string = '';
  ciudadDestino: string = '';
  constructor(private ciudadService: CiudadService) {}

  ciudadOrigenDestino(form: NgForm){
    this.ciudadOrigen = form.value.origen;
    this.ciudadDestino = form.value.destino;
    
    this.ciudadService.setOrigenDestino(form.value.origen, form.value.destino);
  }

  buscarRuta(form: NgForm){
    // Se pasan las ciudades de origen y destino
    this.ciudadOrigenDestino(form);

    // Se llama al servicio para que cree la red de ciudades
    this.mensaje = this.ciudadService.buscarRuta();
  }

}
