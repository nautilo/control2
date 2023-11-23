import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CrearcuentaPage } from './crearcuenta.page';

describe('CrearcuentaPage', () => {
  let component: CrearcuentaPage;
  let fixture: ComponentFixture<CrearcuentaPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CrearcuentaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
