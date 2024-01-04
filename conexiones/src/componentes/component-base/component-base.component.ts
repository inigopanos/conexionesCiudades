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

  constructor(private ciudadService: CiudadService) {}

  ciudadOrigenDestino(form: NgForm){
    this.ciudadService.setOrigenDestino(form.value.origen, form.value.destino);
  }


}
