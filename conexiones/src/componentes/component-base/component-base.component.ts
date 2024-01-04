import { Component } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-component-base',
  standalone: true,
  imports: [],
  templateUrl: './component-base.component.html',
  styleUrl: './component-base.component.sass'
})
export class ComponentBaseComponent {

  constructor(private dialog: MatDialog) {}

  ciudades: string[] = [];

  onCiudadAgregada(ciudad: string){
    this.ciudades.push(ciudad);
    console.log('Ciudades:', this.ciudades);
  }

}
