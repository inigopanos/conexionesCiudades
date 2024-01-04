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

  ciudadesString: string[] = [];
  conexionesString: string[] = [];

  ciudadOrigen: string = '';
  ciudadDestino: string = '';

  agregarConexionesString(conexionString:string){
    this.conexionesString.push(conexionString);
    console.log('Conexiones String:', this.conexionesString);

  }

  agregarCiudad(ciudad:string){
    this.ciudadesString.push(ciudad)
  }
  eliminarCiudad(ciudad:string){
    this.ciudadesString = this.ciudadesString.filter((c) => c !== ciudad);
  }

  setOrigenDestino(origen: string, destino: string){
    this.ciudadOrigen = origen;
    this.ciudadDestino = destino;
  }

  crearRedCiudades(ciudades: Ciudad[], conexiones:Conexion[]){
    const redCiudades: { [key: string]: Ciudad } = {};

    // Crea un objeto ciudad por cada una de las ciudades del input
    for (const nombreCiudad of this.ciudadesString){
        redCiudades[nombreCiudad] = new Ciudad(nombreCiudad)
    }

    // Crea un objeto transporte por cada transporte de conexiones
    for (const conexion of this.conexionesString)
    {
        const [origen, destino, tipoTransporte, ...detalles] = conexion.split(" ");
        continue;
  
    let transporte: Transporte;

    switch (tipoTransporte) {
        case "Coche": // Este origen y destino son strings, en vez de Ciudad!!
          transporte = new Coche(detalles[0], origen, destino);
          break;
  
        case "Tren":
          transporte = new Tren(detalles[0], detalles[1], origen, destino);
          break;
  
        case "Avion":
          transporte = new Avion(detalles[0], detalles[1], origen, destino);
          break;
  
        case "Barco":
          transporte = new Barco(detalles[0], origen, destino);
          break;
  
        default:
          console.error(`Tipo de transporte desconocido: ${tipoTransporte}`);
          continue;
      }
    }
  }

 
}
