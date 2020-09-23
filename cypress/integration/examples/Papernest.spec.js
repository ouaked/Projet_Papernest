describe(' Tests auto pour le site Papernest  ', () => {
    before(() => {
        cy.clearLocalStorage();
        cy.clearCookies();
        cy.visit('https://app.papernest.com/onboarding?anonymous&anonymousId=test&id_text=1&destination=newspaper-address-change')
        cy.wait(10000); // appli est lente au démarrage
    })
    it('Changement d\'adresse pour un magazine ', () => {
        //Select magazine
        cy.contains('Faire suivre votre journal ou magazine préféré').click()
        cy.contains('Demander gratuitement le changement d\'adresse').click()
        cy.url().should('contain', '/presse')
        cy.contains('Auto Moto').click()
        cy.get('[id="newspaper-address_change.reference"]').type('X234500')
        cy.wait(100)
        cy.contains('Suivant').click()

        //fill new adress
        cy.get('[id="housing.address"]').type('157 Boulevard Macdonald 75019 Paris')
        cy.wait(1000)
        cy.get('[class="ng-star-inserted"]').eq(0).click({force:true})
        cy.get('[id="housing.address"]').should('have.value', '157 Boulevard Macdonald 75019 Paris')
        cy.contains('Suivant').click()
        let arg = Math.floor(Math.random() * Math.floor(1000));
        let arg_val = arg.toString();
        cy.get('[id="user.email"]').type('charles_' + arg_val + '_test@papernest.com').should('have.value', 'charles_' + arg_val + '_test@papernest.com')
        cy.get('[id="user.phone_number"]').type('601010101').should('have.value', '6 01 01 01 01')
        cy.get('[id="user.first_name"]').type('Charles').should('have.value', 'Charles')
        cy.get('[id="user.last_name"]').type('Dupond').should('have.value', 'Dupond')
        cy.contains('Suivant').click()

        // Select date
        cy.get('[id="newspaper-address_change.begin_date"').click()
        cy.get('[class="mat-ripple mat-button-ripple mat-button-ripple-round"]').eq(1).click({force:true});
        cy.get('[aria-label="26 octobre 2020"]').click()
        cy.wait(100)

        //check confirmation step
        cy.get('[id="{newspaper-address_change.provider_name}"]').should('contain','Auto Moto')
        cy.get('[id="{newspaper-address_change.reference}"]').should('contain','X234500')
        cy.contains('Valider').click()

        cy.get('[class="subtitle inline ng-star-inserted"]').should('contain', 'Votre demande de changement d\'adresse a bien été effectuée')
        cy.get('#_validaton_ar').click()
        
        //Dashboard
        cy.url().should('contain', '/mes-abonnements')
        cy.contains('Changement d\'adresse de votre abonnement').should('be.visible')
        cy.contains('Demande de changement d\'adresse envoyée').should('be.visible') 
    })
 })