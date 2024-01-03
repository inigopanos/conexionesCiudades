class Ciudad {
  nombre: string;
  conexiones: Conexion[];

  constructor(nombre: string) {
    this.nombre = nombre;
    this.conexiones = [];
  }

  agregarConexion(conexion: Conexion): void {
    this.conexiones.push(conexion);
  }
}

class Conexion {
  origen: Ciudad;
  destino: Ciudad;
  transporte: Transporte;

  constructor(origen: Ciudad, destino: Ciudad, transporte: Transporte) {
    this.origen = origen;
    this.destino = destino;
    this.transporte = transporte;
  }

  conexionRuta(): void {
    console.log(`Coge el ${this.transporte.tipo} desde ${this.origen.nombre} hasta ${this.destino.nombre}`);
  }
}

class Transporte {
  tipo: string;

  constructor(tipo: string) {
    this.tipo = tipo;
  }
}

class Tren extends Transporte {
  numTren: string;
  numAsiento: string;
  origen: Ciudad;
  destino: Ciudad;

  constructor(numTren: string, numAsiento: string, origen: Ciudad, destino: Ciudad) {
    super("Tren");
    this.numTren = numTren;
    this.numAsiento = numAsiento;
    this.origen = origen;
    this.destino = destino;
  }
}

class Avion extends Transporte {
  numAsiento: string;
  numVuelo: string;
  origen: Ciudad;
  destino: Ciudad;

  constructor(numAsiento: string, numVuelo: string, origen: Ciudad, destino: Ciudad) {
    super("Avion");
    this.numAsiento = numAsiento;
    this.numVuelo = numVuelo;
    this.origen = origen;
    this.destino = destino;
  }
}

class Coche extends Transporte {
  matricula: string;
  origen: Ciudad;
  destino: Ciudad;

  constructor(matricula: string, origen: Ciudad, destino: Ciudad) {
    super("Coche");
    this.matricula = matricula;
    this.origen = origen;
    this.destino = destino;
  }
}

class Barco extends Transporte {
  numBarco: string;
  origen: Ciudad;
  destino: Ciudad;

  constructor(numBarco: string, origen: Ciudad, destino: Ciudad) {
    super("Barco");
    this.numBarco = numBarco;
    this.origen = origen;
    this.destino = destino;
  }
}

export { Ciudad, Conexion, Transporte, Avion, Tren, Coche, Barco };