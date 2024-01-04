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

  agregarConexionesString(conexionString: string) {
    this.conexionesString.push(conexionString);
  }

  agregarCiudad(ciudad: string) {
    this.ciudadesString.push(ciudad);
  }
  eliminarCiudad(ciudad: string) {
    this.ciudadesString = this.ciudadesString.filter((c) => c !== ciudad);
  }

  setOrigenDestino(origen: string, destino: string) {
    this.ciudadOrigen = origen;
    this.ciudadDestino = destino;
  }

  buscarRuta() {
    // Se crea la red de ciudades
    this.crearRedCiudades(this.ciudadesString, this.conexionesString);
    let redCiudades = this.crearRedCiudades(
      this.ciudadesString,
      this.conexionesString
    );
    // Se bucan las rutas entre ciudades
    this.encontrarRutas(
      redCiudades[this.ciudadOrigen],
      redCiudades[this.ciudadDestino]
    );
  }

  crearRedCiudades(ciudades: string[], conexiones: string[]) {
    const redCiudades: { [key: string]: Ciudad } = {};

    // Crea un objeto ciudad por cada una de las ciudades del input
    for (const nombreCiudad of this.ciudadesString) {
      redCiudades[nombreCiudad] = new Ciudad(nombreCiudad);
    }

    // Crea un objeto transporte por cada transporte de conexiones
    for (const conexion of this.conexionesString) {
      const [origen, destino, tipoTransporte, ...detalles] =
        conexion.split(' ');
      
      let transporte: Transporte;

      switch (tipoTransporte) {
        case 'Coche': // Este origen y destino son strings, en vez de Ciudad!!
          console.log('Tipo de transporte:', tipoTransporte);
          transporte = new Coche(detalles[0], origen, destino);
          break;

        case 'Tren':
          console.log('Tipo de transporte:', tipoTransporte);
          transporte = new Tren(detalles[0], detalles[1], origen, destino);
          break;

        case 'Avion':
          console.log('Tipo de transporte:', tipoTransporte);
          transporte = new Avion(detalles[0], detalles[1], origen, destino);
          break;

        case 'Barco':
          console.log('Tipo de transporte:', tipoTransporte);
          transporte = new Barco(detalles[0], origen, destino);
          break;

        default:
          console.log('Tipo de transporte:', tipoTransporte);
          console.error(`Tipo de transporte desconocido: ${tipoTransporte}`);
          continue;
      }

      redCiudades[origen].agregarConexion(
        new Conexion(redCiudades[origen], redCiudades[destino], transporte)
      );
    }

    console.log('Red Ciudades:', redCiudades);
    return redCiudades;
  }

  encontrarRutas(ciudadOrigen: Ciudad, ciudadDestino: Ciudad) {
    const ciudadesExploradas = new Set<Ciudad>();
    let conexionesExplorando = [];
    let rutaEncontrada = false;
    let index = 0;

    conexionesExplorando = [...ciudadOrigen.conexiones];

    while (index < conexionesExplorando.length) {
      // Obtener la conexión en el índice actual sin modificar el array
      let conexion = conexionesExplorando[index];

      // Incrementar el índice para la próxima iteración
      index++;

      // Si la ciudad de búsqueda actual es la ciudad destino, se acaba
      if (conexion.destino.nombre === ciudadDestino.nombre) {
        ciudadesExploradas.add(conexion.origen);
        ciudadesExploradas.add(conexion.destino);
        rutaEncontrada = true;
        break;
      }

      // Si las ciudades exploradas no contienen la ciudad de origen
      if (!ciudadesExploradas.has(conexion.origen)) {
        ciudadesExploradas.add(conexion.origen);

        // Añade las conexiones de cada ciudad a la lista de ciudades por explorar
        for (let conexionesTest of conexion.origen.conexiones) {
          conexionesExplorando.push(...conexionesTest.destino.conexiones);
        }
      }
    }

    if (rutaEncontrada) {
      this.imprimirMensajeRuta(ciudadesExploradas);
      console.log('Se ha encontrado la ruta:', ciudadesExploradas);
    } else {
      console.log(
        `No existe una ruta de ${ciudadOrigen.nombre} a ${ciudadDestino.nombre}`
      );
    }
  }

  imprimirMensajeRuta(ciudades: Set<Ciudad>) {
    let ciudadesIter = [...ciudades];
    let mensaje = `Coge el `;

    if (ciudades.size !== 0) {
      console.log(
        `Viaje de ${ciudadesIter[0].nombre} a ${
          ciudadesIter[ciudadesIter.length - 1].nombre
        }:`
      );

      for (let i = 1; i < ciudadesIter.length; i++) {
        const conexion = ciudadesIter[i - 1].conexiones.find(
          (con) => con.destino === ciudadesIter[i]
        );

        if (conexion) {
          const transporte: Transporte = conexion.transporte;

          if (transporte instanceof Tren) {
            mensaje += `tren ${transporte.numTren} con asiento ${transporte.numAsiento}`;
          } else if (transporte instanceof Coche) {
            mensaje += `coche con matrícula ${transporte.matricula}`;
          } else if (transporte instanceof Avion) {
            mensaje += `avión con número de vuelo ${transporte.numVuelo} y asiento ${transporte.numAsiento}`;
          } else if (transporte instanceof Barco) {
            mensaje += `barco con número ${transporte.numBarco}`;
          } else {
            // Manejar el caso en el que el tipo de transporte no es reconocido
            mensaje += `Tipo de transporte no reconocido`;
          }

          mensaje += ` desde ${ciudadesIter[i - 1].nombre} hasta ${
            ciudadesIter[i].nombre
          }`;
          console.log(mensaje);
          return;
        } else {
          console.log(
            `${i}. No hay conexión directa desde ${
              ciudadesIter[i - 1].nombre
            } hasta ${ciudadesIter[i].nombre}.`
          );
          return;
        }
      }
    }

    console.log('¡Felicidades, has llegado a tu destino!');
    return mensaje;
  }
}
