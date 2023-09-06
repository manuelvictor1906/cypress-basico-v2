/// <reference types="Cypress" />


describe('Central de Atendimento ao Cliente TAT', function() {
    
    beforeEach(function() {
        //Visitando a pagina de teste local que se encontra index.html 
        cy.visit('./src/index.html')
    })
    
    it('verifica o título da aplicação', function() {
       //Validando o titulo da aplicação
        cy.title().should('be.equal', "Central de Atendimento ao Cliente TAT")
    })

    it('preenche os campos obrigatórios e enviar o formulário', function() {

        cy.get('#firstName').type('Manu Victor')
        cy.get('#lastName').type('Carvalhais')
        cy.get('#email').type('testandoCypress@gmail.com')
        cy.get('#phone').type('12999999999')
        cy.get('#open-text-area').type('Observação teste')
        cy.get('button[class="button"]').click() 
        cy.get('.success').should('be.visible')
    
    
    })

    it('Validar campo email com formatação inválida', function() {

        cy.get('#firstName').type('Manu Victor')
        cy.get('#lastName').type('Carvalhais')
        cy.get('#email').type('testandoCypress')
        cy.get('#phone').type('12999999999')
        cy.get('#open-text-area').type('Observação teste')
        cy.get('button[class="button"]').click() 
        cy.get('span[class=error]').contains("Valide os campos obrigatórios!")
        cy.get('.error').should('be.visible')
    
    })

    it('Validar campo telefone não aceita valor não numérico', function() {

        cy.get('#firstName').type('Manu Victor')
        cy.get('#lastName').type('Carvalhais')
        cy.get('#email').type('testandoCypress@gmail.com')
        cy.get('#phone').type('abc')
            .should('have.value', "")
        cy.get('#open-text-area').type('Observação teste')
        cy.get('#phone-checkbox').click()
        cy.get('button[class="button"]').click() 
        cy.get('span[class=error]').contains("Valide os campos obrigatórios!")
        cy.get('.error').should('be.visible')

    })

    it('Validar limpar campo nome', function() {

        cy.get('#firstName').type('Manu Victor')
            .should('have.value', "Manu Victor")
        cy.get('#firstName').clear()
        .should('have.value', "")

    })

    it('Validar envio do formulario usando um comando customizado', function() {
        //Como realizar um comando customizado
        cy.comandoCustomizadoParaOFormulario()
        cy.get('.success').should('be.visible')

    })

    it('Validar seleção um tipo de atendimento', function() {
        
        cy.get('#product')
        .select('Cursos')
        .should('have.value',"cursos")

    })

    it('Validar seleção de um tipo de atendimento pelo indice', function() {
        
        cy.get('#product')
        .select(2)
        .should('have.value',"cursos")

    })

    it('Validar marcação de inputs do tipo radio', function() {
        cy.get('input[value="feedback"]')
        .check()
        .should('be.checked')

    })

    it('Validar marcação de inputs do tipo checbox', function() {
        cy.get('#email-checkbox')
        .check()
        .should('be.checked')
        .uncheck()
        .should('not.be.checked')

    })

    it('Validar marcação de inputs do tipo checbox (Outra forma)', function() {
        cy.get('input[type="checkbox"]')
        .check()
        .should('be.checked')
        .last().uncheck().should('not.be.checked')
    })

    it('Validar upload de arquivos', function() {
        
        cy.get('#file-upload').click()
            .should('not.have.value')
         //Anexando um arquivo
         .selectFile('cypress/fixtures/example.json')
         //Validando o arquivo anexado
         .should(function(input){
            console.log(input)
            expect(input[0].files[0].name).to.equal("example.json")

        })

    })

    it('Seleciona um arquivo simulando um drag and drop', function() {
        
        cy.get('#file-upload').click()
            .should('not.have.value')
         //Anexando um arquivo
         .selectFile('cypress/fixtures/example.json', {action:'drag-drop'})
         //Validando o arquivo anexado
         .should(function(input){
            console.log(input)
            expect(input[0].files[0].name).to.equal("example.json")
        })

    })

    it('Seleciona um arquivo utilizando uma fixture', function() {
        //criando um alias que será o "aliasArquivoExemplo"
        cy.fixture('example.json').as('aliasArquivoExemplo')
        cy.get('#file-upload')
            .selectFile('@aliasArquivoExemplo')
            .should(function(input){
                console.log(input)
                expect(input[0].files[0].name).to.equal("example.json")
    
            })

    })

    it('Validar existencia de nova aba em politica de privacidade', function() {
       cy.get('#privacy a').should('have.attr', 'target',"_blank")

    })

    it('Validar Remover o target e acessar politica de privacidade na mesma aba ', function() {
        cy.get('#privacy a').invoke('removeAttr', 'target')
        cy.get('#privacy').click()
        cy.contains('CAC TAT - Política de privacidade').should('be.visible')
 
    })
    
    it('Validar o uso do clock e tick', function() {
        cy.clock()
        cy.comandoCustomizadoParaOFormulario()
        cy.get('.success').should('be.visible')
        cy.tick(3000)
        cy.get('.success').should('not.be.visible')
    })

    //Rodar o mesmo teste n vezes. = cypress._.times(x, function{})
    Cypress._.times(3,function(){
        
        it('Validar o uso do clock e tick', function() {
            cy.clock()
            cy.comandoCustomizadoParaOFormulario()
            cy.get('.success').should('be.visible')
            cy.tick(3000)
            cy.get('.success').should('not.be.visible')
        })

    })

    it('exibe e esconde as mensagens de sucesso e erro usando o .invoke', function() {
       cy.get('.success')
            .should('not.be.visible')
            .invoke('show') //Mostra todas as mensagens escondidas
            .should('be.visible').and('contain',"Mensagem enviada com sucesso.")
            .invoke('hide') //Esconde as mensagens
            .should('not.be.visible')
        cy.get('.error')
            .should('not.be.visible')
            .invoke('show')
            .should('be.visible').and('contain',"Valide os campos obrigatórios!")
            .invoke('hide') //Esconde as mensagens
            .should('not.be.visible')
    })

    it('Preencher a area de texto usando o repeat', function() {
        
        const textoLongo = Cypress._.repeat('Testando Cypress', 10)

        cy.get('#open-text-area').type(textoLongo)
            .should('have.value',textoLongo)
            
     })

     it.only('Encontre o gato na aplicaçã', function() {

        cy.get('#cat')
            .invoke('show')
            .should('be.visible')
            
     })
            
     it('Requisição GET', function() {
       
        const URL = 'https://cac-tat.s3.eu-central-1.amazonaws.com/index.html'
        cy.request(URL)
            .should(function(response){
                console.log(response)
                expect(response.status).to.equal(200)
                expect(response.statusText).to.equal("OK")
                expect(response.body).to.include("CAC TAT")

            })
            
     })

    
})
  