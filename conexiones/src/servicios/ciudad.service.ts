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
    let mensaje: string;

    mensaje = this.encontrarRutas(
      redCiudades[this.ciudadOrigen],
      redCiudades[this.ciudadDestino]
    );
    return mensaje;
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
          transporte = new Coche(detalles[0], origen, destino);
          break;

        case 'Tren':
          transporte = new Tren(detalles[0], detalles[1], origen, destino);
          break;

        case 'Avion':
          transporte = new Avion(detalles[0], detalles[1], origen, destino);
          break;

        case 'Barco':
          transporte = new Barco(detalles[0], origen, destino);
          break;

        default:
          console.error(`Tipo de transporte desconocido: ${tipoTransporte}`);
          continue;
      }

      redCiudades[origen].agregarConexion(
        new Conexion(redCiudades[origen], redCiudades[destino], transporte)
      );
    }

    return redCiudades;
  }

  imprimirMensajeRuta(ciudades: Set<Ciudad>) {
    let ciudadesIter = [...ciudades];
    let mensaje: string = ``;
    let mensajeError: string = '';
    let index: number = 0

    if (ciudades.size !== 0) {
      for (let i = 1; i < ciudadesIter.length; i++) {
        const conexion = ciudadesIter[i - 1].conexiones.find(
          (con) => con.destino === ciudadesIter[i]
        );
        index++;

        if (conexion) {
          const transporte: Transporte = conexion.transporte;

          if (transporte instanceof Tren) {
            mensaje += `${index}. Coge el tren ${transporte.numTren} con asiento ${transporte.numAsiento}`;
          } else if (transporte instanceof Coche) {
            mensaje += `${index}. Coge el coche con matrícula ${transporte.matricula}`;
          } else if (transporte instanceof Avion) {
            mensaje += `${index}. Coge el avión con número de vuelo ${transporte.numVuelo} y asiento ${transporte.numAsiento}`;
          } else if (transporte instanceof Barco) {
            mensaje += `${index}. Coge el barco con número ${transporte.numBarco}`;
          } else {
            // Manejar el caso en el que el tipo de transporte no es reconocido
            mensajeError = `Tipo de transporte no reconocido`;
            return mensajeError;
          }

          mensaje += ` desde ${ciudadesIter[i - 1].nombre} hasta ${
            ciudadesIter[i].nombre
          }. <br>`;
        } else {
          mensajeError = `${i}. No hay conexión directa desde ${
            ciudadesIter[i - 1].nombre
          } hasta ${ciudadesIter[i].nombre}.`;
          return mensajeError;
        }
      }

      console.error('¡Felicidades, has llegado a tu destino!');
      return mensaje;
    } else {
      return 'El conjunto de ciudades está vacío.';
    }
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
      let mensaje = this.imprimirMensajeRuta(ciudadesExploradas);
      return mensaje;
    } else {
      return `No existe una ruta de ${ciudadOrigen.nombre} a ${ciudadDestino.nombre}`;
    }
  }
}
