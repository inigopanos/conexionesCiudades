// ciudad.service.ts
import { Injectable } from '@angular/core';
import {
  Ciudad,
  Conexion,
  Transporte,
  Tren,
  Avion,
  Coche,
  Barco,
} from '../clases/constructor';

@Injectable({
  providedIn: 'root',
})
export class CiudadService {

  ciudadesString: string[] = [];
  conexionesString: string[] = [];

  ciudadOrigen: string = '';
  ciudadDestino: string = '';

  agregarConexionesString(conexionString:string){
    this.conexionesString.push(conexionString);
    console.log('Conexiones String:', this.conexionesString);

  }

  setOrigenDestino(origen: string, destino: string){
    this.ciudadOrigen = origen;
    this.ciudadDestino = destino;
  }


  encontrarRutas(ciudadOrigen: string, ciudadDestino: string){

  }
}
