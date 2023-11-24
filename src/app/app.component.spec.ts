import { Usuario } from "./model/usuario";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { TestBed } from "@angular/core/testing";
import { AppComponent } from "./app.component";
import { expect } from '@jest/globals';


describe('Probar el comienzo de la aplicación', ()=>{
    beforeEach(async ()=>{
        await TestBed.configureTestingModule({
            declarations: [AppComponent],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
        }).compileComponents();
    });
        it('Se debería crear la aplicación',()=>{
            const fixture = TestBed.createComponent(AppComponent);
            const app = fixture.componentInstance;
            expect(app).toBeTruthy();
        });

        it('Probar que el título de la App sea "Sistema de asistencia Duoc UC"',()=>{
            const fixture = TestBed.createComponent(AppComponent);
            const app = fixture.componentInstance;
            expect(app.title).toEqual('Sistema de asistencia Duoc UC');
        });
        
});