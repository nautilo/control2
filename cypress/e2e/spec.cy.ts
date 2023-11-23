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
        cy.get('#contenido').invoke('val', '');
        cy.get('#contenido').type(`Contenido de prueba ${numero} editado.`);
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
});