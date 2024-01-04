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
  ciudades: Ciudad[] = [];
  conexiones: Conexion[] = [];

  agregarCiudad(ciudad: Ciudad): void {
    this.ciudades.push(ciudad);
  }

  agregarConexion(conexion: Conexion): void {
    this.conexiones.push(conexion);
  }

//   crearRedCiudades(ciudades: string[], conexiones: string[]) {
//     const redCiudades = {};

//     for (const nombreCiudad of ciudades) {
//       redCiudades[nombreCiudad] = new Ciudad(nombreCiudad);
//     }
//   }
}
