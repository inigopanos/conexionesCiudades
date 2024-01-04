// ciudad.service.ts
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CiudadService {
  private ciudadAgregadaSubject = new Subject<string>();

  ciudadAgregada$ = this.ciudadAgregadaSubject.asObservable();

  agregarCiudad(nuevaCiudad: string) {
    this.ciudadAgregadaSubject.next(nuevaCiudad);
    console.log('Ciudades:', this.ciudadAgregada$);
  }
}
