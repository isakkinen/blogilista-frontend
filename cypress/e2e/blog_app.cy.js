describe('Blog app', () => {
    const user = {
        name: 'Iisakki Säkkinen',
        username: 'tester',
        password: 'salainen'
    }
    describe('When first entering page', function() {
        beforeEach(function() {
            cy.request('POST', 'http://localhost:3003/api/testing/reset')
            cy.request('POST', 'http://localhost:3003/api/users', user)
            cy.visit('http://localhost:5173')
        })

        it('front page can be opened', function() {
            cy.contains('Login')
        })

        it('login proceeds to blog listing', function() {
            cy.contains('Login')
            cy.get('#username').type(user.username)
            cy.get('#password').type(user.password)
            cy.contains('login').click()

            cy.contains('Iisakki Säkkinen logged in')
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