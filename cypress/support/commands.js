//Adicionando um novo comando ao cypress
Cypress.Commands.add('comandoCustomizadoParaOFormulario', function(){
    cy.get('#firstName').type('Manu Victor')
    cy.get('#lastName').type('Carvalhais')
    cy.get('#email').type('testandoCypress@gmail.com')
    cy.get('#phone').type('12999999999')
    cy.get('#open-text-area').type('Observação teste')
    cy.contains('button',"Enviar").click() 
})