import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CiudadesFormComponent } from './ciudades-form.component';

describe('CiudadesFormComponent', () => {
  let component: CiudadesFormComponent;
  let fixture: ComponentFixture<CiudadesFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CiudadesFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CiudadesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
