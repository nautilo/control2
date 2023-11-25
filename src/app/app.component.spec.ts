import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { TestBed } from "@angular/core/testing";
import { AppComponent } from "./app.component";
import { RouterTestingModule } from "@angular/router/testing";
import { Usuario } from "./model/usuario";
// PRUEBAS UNITARIAS KARMA/JASMINE (se muestra el estado de las pruebas en consola del navegador luego de hacer clic en DEBUG)
// Acá se prueba el comienzo de la aplicación con el título de ésta. (2 pruebas para AppComponent)
// También se prueban métodos de la clase Usuario:
//      -1. Probar que la contraseña sea correcta (4 pruebas)
//      -2. Probar que el campo "correo" no esté vacío y tenga formato correcto(1 prueba)
//      -3. Probar que el campo "nombre" no esté vacío (1 prueba)
//      -4. Probar que el campo "apellido" no esté vacío (1 prueba)
//      -5. Probar que la pregunta secreta sea correcta (2 pruebas)
//      -6. Probar que la respuesta secreta sea correcta (2 pruebas)
// TOTAL: 13 pruebas unitarias
describe('Probar el comienzo de la aplicación', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent, RouterTestingModule],  // Agrega RouterTestingModule
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  it('Se debería crear la aplicación', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('Probar que el título de la App sea "Sistema de asistencia Duoc UC"', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('Sistema de asistencia Duoc UC');
  });
});

describe('Probar clase de usuario', () => {

    describe ('Probar que la contraseña sea correcta', () => {
        const usuario = new Usuario();
        usuario.setUsuario('atorres@duocuc.cl', 'abc123', 'Ana', 'Torres Leiva', '¿Cuál es tu animal favorito?', 'gato','');
  
        it ('Probar que la contraseña no sea vacía', () => {
          usuario.password = '';
          expect(usuario.validarPassword(usuario.password)).toContain('Para entrar al sistema debe ingresar la contraseña.');
        });
  
        it ('Probar que la contraseña sea numérica y no "abcd"', () => {
          usuario.password = 'abcd';
          expect(usuario.validarPassword(usuario.password)).toContain('debe ser numérica');
        });
  
        it ('Probar que la contraseña no supere los 4 dígitos como por ejemplo "1234567890"', () => {
          usuario.password = '1234567890';
          expect(usuario.validarPassword(usuario.password)).toContain('debe ser numérica de 4 dígitos');
        });
  
        it ('Probar que la contraseña sea de 4 dígitos como por ejemplo "1234"', () => {
          usuario.password = '1234';
          expect(usuario.validarPassword(usuario.password)).toEqual('');
        });
  
      });
      describe ('Probar que el correo no sea vacío y tenga formato correcto', () => {
        const usuario = new Usuario();
        usuario.setUsuario('atorres@duocuc.cl', 'abc123', 'Ana', 'Torres Leiva', '¿Cuál es tu animal favorito?', 'gato','');
  
        it ('Probar que el correo no sea vacío y tenga formato correcto', () => {
          usuario.correo = '';
          expect(usuario.validarCorreo(usuario.correo)).toContain('El campo "correo" debe tener un valor.');
        });
      });

      describe ('Probar que el nombre no sea vacío', () => {
        const usuario = new Usuario();
        usuario.setUsuario('atorres@duocuc.cl', 'abc123', 'Ana', 'Torres Leiva', '¿Cuál es tu animal favorito?', 'gato','');
  
        it ('Probar que el nombre no sea vacío', () => {
          usuario.nombre = '';
          expect(usuario.validarNombre(usuario.nombre)).toContain('El campo "nombre" debe tener un valor.');
        });
      });

      describe ('Probar que el apellido no sea vacío', () => {
        const usuario = new Usuario();
        usuario.setUsuario('atorres@duocuc.cl', 'abc123', 'Ana', 'Torres Leiva', '¿Cuál es tu animal favorito?', 'gato','');
  
        it ('Probar que el apellido no sea vacío', () => {
          usuario.apellido = '';
          expect(usuario.validarApellido(usuario.apellido)).toContain('El campo "apellido" debe tener un valor.');
        });
      });

      describe ('Probar que la pregunta secreta sea correcta', () => {
        const usuario = new Usuario();
        usuario.setUsuario('atorres@duocuc.cl', 'abc123', 'Ana', 'Torres Leiva', '¿Cuál es tu animal favorito?', 'gato','');
  
        it ('Probar que la pregunta secreta no sea vacía', () => {
          usuario.preguntaSecreta = '';
          expect(usuario.validarPreguntaSecreta(usuario.preguntaSecreta)).toContain('El campo "pregunta secreta" debe tener un valor.');
        });
        it ('Probar que la pregunta secreta sea la correcta, por ejemplo: "¿Cuál es tu animal favorito?"', () => {
            usuario.preguntaSecreta = '¿Cuál es tu animal favorito?';
            expect(usuario.validarPreguntaSecreta(usuario.preguntaSecreta)).toEqual('');
          });
      });

      describe ('Probar que la respuesta secreta sea correcta', () => {
        const usuario = new Usuario();
        usuario.setUsuario('atorres@duocuc.cl', 'abc123', 'Ana', 'Torres Leiva', '¿Cuál es tu animal favorito?', 'gato','');
  
        it ('Probar que la respuesta secreta no sea vacía', () => {
          usuario.respuestaSecreta = '';
          expect(usuario.validarRespuestaSecreta(usuario.respuestaSecreta)).toContain('El campo "respuesta secreta" debe tener un valor.');
        });
        it ('Probar que la respuesta secreta sea la correcta, por ejemplo: "gato"', () => {
            usuario.respuestaSecreta = 'gato';
            expect(usuario.validarRespuestaSecreta(usuario.respuestaSecreta)).toEqual('');
          });
      });
  
  });
