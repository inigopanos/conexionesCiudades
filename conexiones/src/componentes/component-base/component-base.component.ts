import { Component, Input } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-component-base',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './component-base.component.html',
  styleUrl: './component-base.component.sass'
})
export class ComponentBaseComponent {
  @Input() ciudades: string[] = [];

  ciudadOrigen: string = ''
  ciudadDestino: string = ''

 
  constructor() {}

  ciudadOrigenDestino(form: NgForm){
    console.log('Ciudades origen y destino:', form.value.origen, form.value.destino);
    this.ciudadOrigen = form.value.origen;
    this.ciudadDestino = form.value.origen;

    return this.ciudadOrigen, this.ciudadDestino;
  }

}
