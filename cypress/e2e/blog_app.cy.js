describe('Blog app', () => {
    const user = {
        name: 'Iisakki Säkkinen',
        username: 'tester',
        password: 'salainen'
    }
    beforeEach(function() {
        cy.request('POST', 'http://localhost:3003/api/testing/reset')
        cy.request('POST', 'http://localhost:3003/api/users', user)
        cy.visit('http://localhost:5173')
    })
    describe('When first entering page', function() {

        it('Login form is shown', function() {
            cy.contains('Login')
        })

        describe('Login', function() {
            it('fails with wrong password', function() {
                cy.contains('Login')
                cy.get('#username').type(user.username)
                cy.get('#password').type('wrong')
                cy.contains('login').click()

                cy.contains('invalid username or password')
            })

            it('proceeds to blog listing when correct credentials are given', function() {
                cy.contains('Login')
                cy.get('#username').type(user.username)
                cy.get('#password').type(user.password)
                cy.contains('login').click()

                cy.contains('Iisakki Säkkinen logged in')
            })
        })
    })

    describe('When logged in', function() {
        beforeEach(function() {
            cy.visit('http://localhost:5173')
            cy.get('#username').type(user.username)
            cy.get('#password').type(user.password)
            cy.contains('login').click()
        })

    })
})