// describe('empty spec', () => {
//   it('passes', () => {
//     cy.visit('https://example.cypress.io')
//   })
// })

/*
Navegar hacia una página en específico:
   cy.visit('http://localhost:8100/').then(() => { ... });

Hacer clic en un botón, usando el texto del botón:
    cy.contains('Ingresa a tu cuenta').click();

Para hacer clic en un botón, usando el id del botón:
    cy.get('#salir').click();

Cambiar el valor de una caja de texto usando su id:
    cy.get('#correo').invoke('val', 'jperez@duocuc.cl');

Comparar el título de la página actual con un valor esperado:
  cy.get('ion-title').should('contain.text', 'Sistema de Asistencia DUOC');

Comparar el texto de un control HTML identificado por un id="#saludo":
  cy.get('#saludo').should('contain.text', '¡Bienvenido Juan Pérez González!');
*/

describe('Verificar mi aplicación', () => {

  // Se intentará navegar hacia la página de inicio con un correo inexistente, por lo que
  // será inutil probar si el saludo se le emite al usuario "Juan Pérez González".
  // En este caso se detectará un error y se mostrará un mensaje.

  it('Verificar login con credenciales incorrectas', () => {
    cy.visit('http://localhost:8100/').then(() => {
      cy.get('#correo').invoke('val', '');
      cy.get('#correo').type('correo-inexistente@duocuc.cl');
      cy.get('#password').invoke('val', '');
      cy.get('#password').type('1234');
      cy.contains('Ingresar').click();
      cy.intercept('/home').as('route').then(() => {
          cy.get('ion-title').should('contain.text', 'Sistema de asistencia Duoc UC');
          cy.contains('Sistema de asistencia Duoc UC');
      });
    });
  });


  // Se intentará navegar hacia la página de inicio con el correo "jperez@duocuc.cl", por lo que
  // la Aplicación debe probar si el saludo se le emite al usuario "Juan Pérez González".
  // En este caso debe pasar correctamente la prueba.

  it('Verificar login con credenciales correctas', () => {
    cy.wait(3000);
    cy.visit('http://localhost:8100/').then(() => {
      cy.get('#correo').invoke('val', '');
      cy.get('#correo').type('cfuentes@duocuc.cl');
      cy.get('#password').invoke('val', '');
      cy.get('#password').type('asdf');
      cy.wait(3000);
      cy.contains('Ingresar').click();
      cy.intercept('/home').as('route').then(() => {
          cy.wait(3000);
          cy.get('ion-title').should('contain.text', 'Sistema de asistencia Duoc UC');
          cy.get('#saludo').should('contain.text', 'Carla Fuentes');
          cy.wait(3000);
          cy.contains('Cerrar sesión').click();
      });
    });
  });

});