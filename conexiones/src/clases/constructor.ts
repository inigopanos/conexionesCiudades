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
  origen: string;
  destino: string;

  constructor(numTren: string, numAsiento: string, origen: string, destino: string) {
    super("Tren");
    this.numTren = numTren;
    this.numAsiento = numAsiento;
    this.origen = origen;
    this.destino = destino;
  }

  override toString(): string{
    return `${this.origen} ${this.destino} ${this.tipo} ${this.numTren} ${this.numAsiento}`
  }
}

class Avion extends Transporte {
  numAsiento: string;
  numVuelo: string;
  origen: string;
  destino: string;

  constructor(numAsiento: string, numVuelo: string, origen: string, destino: string) {
    super("Avion");
    this.numAsiento = numAsiento;
    this.numVuelo = numVuelo;
    this.origen = origen;
    this.destino = destino;
  }

  override toString(): string{
    return `${this.origen} ${this.destino} ${this.tipo} ${this.numVuelo} ${this.numAsiento}`
  }
}

class Coche extends Transporte {
  matricula: string;
  origen: string;
  destino: string;

  constructor(matricula: string, origen: string, destino: string) {
    super("Coche");
    this.matricula = matricula;
    this.origen = origen;
    this.destino = destino;
  }

  override toString(): string{
    return `${this.origen} ${this.destino} ${this.tipo} ${this.matricula}`
  }
}

class Barco extends Transporte {
  numBarco: string;
  origen: string;
  destino: string;

  constructor(numBarco: string, origen: string, destino: string) {
    super("Barco");
    this.numBarco = numBarco;
    this.origen = origen;
    this.destino = destino;
  }

  override toString(): string{
    return `${this.origen} ${this.destino} ${this.tipo} ${this.numBarco}`
  }
}

export { Ciudad, Conexion, Transporte, Avion, Tren, Coche, Barco };
