import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms'; 

@Component({
  selector: 'app-conexion-form',
  templateUrl: './conexion-input.component.html',
  styleUrls: ['./conexion-input.component.css']
})
export class ConexionFormComponent {

  constructor() {}

  holaMundo(){
    console.log('Hola Mundo')
  }

  agregarConexion(formulario: any): void {
    // Lógica para agregar la conexión
    console.log('Conexión agregada:', formulario.value);
  }

  cambiarDetallesTransporte(): void {
    // Puedes realizar acciones adicionales al cambiar el tipo de transporte
  }
  
  ngOnInit() {
    
  }
}
