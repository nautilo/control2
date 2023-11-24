// Estas son las pruebas E2E con Cypress, para asegurar la calidad del software:
//     1. Probar Ingreso con credenciales correctas
//     2. Probar Ingreso con credenciales incorrectas
//     3. En API Foro probar: crear, actualizar y eliminar
//     4. En Mis Datos probar todas las validaciones de campos
//     5. En Mis Datos probar la actualización correcta del perfil de usuario
describe('Verificar mi aplicación', () => {

  const numero = Math.floor(Math.random() * 1000000) + 1;

  it('Verificar inicio de sesión con credenciales incorrectas', () => {
    cy.visit('/').then(() => {
      cy.contains('Sistema de asistencia Duoc UC');
      cy.get('#correo').invoke('val', '');
      cy.get('#correo').type('correo-inexistente@duocuc.cl');
      cy.get('#password').invoke('val', '');
      cy.get('#password').type('1234');
      cy.contains('Ingresar').click();
      cy.intercept('/inicio').as('route').then(() => {
        cy.contains('Sistema de asistencia Duoc UC');
      });
    });
  })

  it('Verificar inicio de sesión con credenciales correctas', () => {
    cy.visit('http://localhost:8100/ingreso').then(() => {
      cy.contains('Sistema de asistencia Duoc UC');
      cy.get('#correo').invoke('val', '');
      cy.get('#correo').type('atorres@duocuc.cl');
      cy.get('#password').invoke('val', '');
      cy.get('#password').type('1234');
      cy.contains('Ingresar').click();
      cy.intercept('/inicio').as('route').then(() => {
        cy.get('#saludo').contains('Ana Torres');
        cy.contains('Cerrar sesión').click();
      });
    });
  })

  it('Verificar publicación en foro', () => {
    cy.visit('http://localhost:8100/ingreso').then(() => {
      cy.contains('Sistema de asistencia Duoc UC');
      cy.get('#correo').invoke('val', '');
      cy.get('#correo').type('atorres@duocuc.cl');
      cy.get('#password').invoke('val', '');
      cy.get('#password').type('1234');
      cy.contains('Ingresar').click();
      cy.intercept('/inicio').as('route').then(() => {
        cy.get('#saludo').contains('Ana Torres');
        cy.get('[ng-reflect-value="foro"]').click();
        cy.get('#titulo').type(`Título de prueba ${numero}`);
        cy.get('#contenido').type(`Contenido de prueba ${numero}`);
        cy.contains('Guardar').click();
        cy.wait(3000);
        cy.contains('Aceptar').click();
        cy.wait(3000);
        cy.contains(`Título de prueba ${numero}`).should('exist');
        cy.contains('Cerrar sesión').click();
      });
    });
  })

  it(`Actualizar en foro de la última publicación con el título que contiene ${numero}`, () => {
    cy.visit('http://localhost:8100/ingreso').then(() => {
      cy.contains('Sistema de asistencia Duoc UC');
      cy.get('#correo').invoke('val', '');
      cy.get('#correo').type('atorres@duocuc.cl');
      cy.get('#password').invoke('val', '');
      cy.get('#password').type('1234');
      cy.contains('Ingresar').click();
      cy.intercept('/inicio').as('route').then(() => {
        cy.get('#saludo').contains('Ana Torres');
        cy.get('[ng-reflect-value="foro"]').click();
        cy.get('#btn-actualizar').click();
        cy.wait(3000);
        cy.get('#titulo').invoke('val', '');
        cy.get('#titulo').type(`Título de prueba ${numero} editado.`);
        cy.wait(1000);
        cy.get('#contenido')
        .find('textarea')
        .invoke('val', '');
        cy.get('#contenido')
        .find('textarea')
        .type(`Contenido de prueba ${numero} editado.`);
        cy.contains('Guardar').click();
        cy.wait(3000);
        cy.contains('Aceptar').click();
        cy.wait(3000);
        cy.contains(`Título de prueba ${numero} editado.`).should('exist');
        cy.contains(`Contenido de prueba ${numero} editado.`).should('exist');
        cy.contains('Cerrar sesión').click();
      });
    });
  })

    it(`Verificar eliminación en foro de la última publicación con el título que contiene ${numero}`, () => {
    cy.visit('http://localhost:8100/ingreso').then(() => {
      cy.contains('Sistema de asistencia Duoc UC');
      cy.get('#correo').invoke('val', '');
      cy.get('#correo').type('atorres@duocuc.cl');
      cy.get('#password').invoke('val', '');
      cy.get('#password').type('1234');
      cy.contains('Ingresar').click();
      cy.intercept('/inicio').as('route').then(() => {
        cy.get('#saludo').contains('Ana Torres');
        cy.get('[ng-reflect-value="foro"]').click();
        cy.get('#btn-eliminar').click();
        cy.wait(3000);
        cy.contains('Aceptar').click();
        cy.wait(3000);
        cy.contains(`Título de prueba ${numero} editado`).should('not.exist');
        cy.contains('Cerrar sesión').click();
      });
    });
  })
  it('Verificar validaciones de campos en Mis Datos', () => {
    cy.visit('http://localhost:8100/ingreso').then(() => {
      cy.contains('Sistema de asistencia Duoc UC');
      cy.get('#correo').invoke('val', '');
      cy.get('#correo').type('atorres@duocuc.cl');
      cy.get('#password').invoke('val', '');
      cy.get('#password').type('1234');
      cy.contains('Ingresar').click();
      cy.intercept('/inicio').as('route').then(() => {
        cy.get('#saludo').contains('Ana Torres');
        cy.get('[ng-reflect-value="misdatos"]').click();

        cy.get('#nombre').invoke('val', '');
        cy.get('#apellido').invoke('val', '');
        cy.get('#apellido').type('Torres');
        cy.get('#pregunta-secreta').invoke('val', '');
        cy.get('#pregunta-secreta').type('Nombre de mi mascota');
        cy.get('#respuesta-secreta').invoke('val', '');
        cy.get('#respuesta-secreta').type('gato');
        cy.get('#password').invoke('val', '');
        cy.get('#password').type('1234');
        cy.get('#repetir-password').invoke('val', '');
        cy.get('#repetir-password').type('1234');
        cy.contains('Actualizar mis datos').click();
        cy.wait(3000);
        cy.contains('Aceptar').click(); //alert: "Debe ingresar nombre"
        cy.wait(3000);

        cy.get('#nombre').invoke('val', '');
        cy.get('#nombre').type('Ana');
        cy.get('#apellido').invoke('val', '');
        cy.get('#pregunta-secreta').invoke('val', '');
        cy.get('#pregunta-secreta').type('Nombre de mi mascota');
        cy.get('#respuesta-secreta').invoke('val', '');
        cy.get('#respuesta-secreta').type('gato');
        cy.get('#password').invoke('val', '');
        cy.get('#password').type('1234');
        cy.get('#repetir-password').invoke('val', '');
        cy.get('#repetir-password').type('1234');
        cy.contains('Actualizar mis datos').click();
        cy.wait(3000);
        cy.contains('Aceptar').click(); //alert: "Debe ingresar apellido"
        cy.wait(3000);

        cy.get('#nombre').invoke('val', '');
        cy.get('#nombre').type('Ana');
        cy.get('#apellido').invoke('val', '');
        cy.get('#apellido').type('Torres');
        cy.get('#pregunta-secreta').invoke('val', '');
        cy.get('#respuesta-secreta').invoke('val', '');
        cy.get('#respuesta-secreta').type('gato');
        cy.get('#password').invoke('val', '');
        cy.get('#password').type('1234');
        cy.get('#repetir-password').invoke('val', '');
        cy.get('#repetir-password').type('1234');
        cy.contains('Actualizar mis datos').click();
        cy.wait(3000);
        cy.contains('Aceptar').click(); //alert: "Debe ingresar pregunta secreta"
        cy.wait(3000);

        cy.get('#nombre').invoke('val', '');
        cy.get('#nombre').type('Ana');
        cy.get('#apellido').invoke('val', '');
        cy.get('#apellido').type('Torres');
        cy.get('#pregunta-secreta').invoke('val', '');
        cy.get('#pregunta-secreta').type('Nombre de mi mascota');
        cy.get('#respuesta-secreta').invoke('val', '');
        cy.get('#password').invoke('val', '');
        cy.get('#password').type('1234');
        cy.get('#repetir-password').invoke('val', '');
        cy.get('#repetir-password').type('1234');
        cy.contains('Actualizar mis datos').click();
        cy.wait(3000);
        cy.contains('Aceptar').click(); //alert: "Debe ingresar respuesta secreta"
        cy.wait(3000);

        cy.get('#nombre').invoke('val', '');
        cy.get('#nombre').type('Ana');
        cy.get('#apellido').invoke('val', '');
        cy.get('#apellido').type('Torres');
        cy.get('#pregunta-secreta').invoke('val', '');
        cy.get('#pregunta-secreta').type('Nombre de mi mascota');
        cy.get('#respuesta-secreta').invoke('val', '');
        cy.get('#respuesta-secreta').type('gato');
        cy.get('#password').invoke('val', '');
        cy.get('#repetir-password').invoke('val', '');
        cy.get('#repetir-password').type('1234');
        cy.contains('Actualizar mis datos').click();
        cy.wait(3000);
        cy.contains('Aceptar').click(); //alert: "Debe ingresar contraseña"
        cy.wait(3000);

        cy.get('#nombre').invoke('val', '');
        cy.get('#nombre').type('Ana');
        cy.get('#apellido').invoke('val', '');
        cy.get('#apellido').type('Torres');
        cy.get('#pregunta-secreta').invoke('val', '');
        cy.get('#pregunta-secreta').type('Nombre de mi mascota');
        cy.get('#respuesta-secreta').invoke('val', '');
        cy.get('#respuesta-secreta').type('gato');
        cy.get('#password').invoke('val', '');
        cy.get('#password').type('1234');
        cy.get('#repetir-password').invoke('val', '');
        cy.contains('Actualizar mis datos').click();
        cy.wait(3000);
        cy.contains('Aceptar').click(); //alert: "Las contraseñas deben ser iguales"
        cy.wait(3000);

        cy.contains('Cerrar sesión').click();
      });
    });
  })

  it('Verificar actualización correcta del perfil de usuario', () => {
    cy.visit('http://localhost:8100/ingreso').then(() => {
      cy.contains('Sistema de asistencia Duoc UC');
      cy.get('#correo').invoke('val', '');
      cy.get('#correo').type('atorres@duocuc.cl');
      cy.get('#password').invoke('val', '');
      cy.get('#password').type('1234');
      cy.contains('Ingresar').click();
      cy.intercept('/inicio').as('route').then(() => {
        cy.get('#saludo').contains('Ana Torres');
        cy.get('[ng-reflect-value="misdatos"]').click();

        cy.get('#nombre').type('Anne');
        cy.get('#apellido').type('Towers');
        cy.get('#pregunta-secreta').type('Name of my pet');
        cy.get('#respuesta-secreta').type('cat');
        cy.get('#password').type('abcd');
        cy.get('#repetir-password').type('abcd');
        cy.contains('Actualizar mis datos').click();
        cy.wait(3000);

        cy.contains('Anne').should('exist');
        cy.contains('Towers').should('exist');
        cy.contains('Name of my pet').should('exist');
        cy.contains('cat').should('exist');
        cy.contains('abcd').should('exist');
        cy.contains('abcd').should('exist');

        cy.contains('Cerrar sesión').click();
      });
    });
  })
});