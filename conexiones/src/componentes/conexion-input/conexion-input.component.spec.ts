import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConexionInputComponent } from './conexion-input.component';

describe('ConexionInputComponent', () => {
  let component: ConexionInputComponent;
  let fixture: ComponentFixture<ConexionInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConexionInputComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConexionInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
