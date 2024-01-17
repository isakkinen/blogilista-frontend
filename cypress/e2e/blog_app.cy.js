describe('Blog app', () => {
    const user = {
        name: 'Iisakki Säkkinen',
        username: 'tester',
        password: 'salainen'
    }
    beforeEach(function() {
        cy.request('POST', 'http://localhost:3003/api/testing/reset')
        cy.request('POST', 'http://localhost:3003/api/users', user)
    })
    describe('When first entering page', function() {
        beforeEach(function() {
            cy.visit('')
        })

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
                cy.get('html').should('not.contain', 'Iisakki Säkkinen logged in')
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
            cy.login({ username: user.username, password: user.password })
        })

        it('A blog can be created', function() {
            cy.contains('New blog').click()
            cy.contains('Add a new blog')
            cy.get('#title').type('A blog created by cypress')
            cy.get('#author').type('Cypress')
            cy.get('#url').type('https://example.com')
            cy.get('#submit').click()
            cy.contains('A blog created by cypress')
            cy.contains('Cypress')
            cy.get('html').should('not.contain', 'Add a new blog')
        })

        describe('When a blog exists', function() {
            this.beforeEach(function() {
                cy.createBlog({ title: 'A blog created by cypress', author: 'Cypress', url: 'https://example.com' })
            })

            it('A blog can be liked', function() {
                cy.contains('view').click()
                cy.contains('like').click()
                cy.contains('1')
            })

            it('A blog can be removed', function() {
                cy.contains('view').click()
                cy.contains('remove').click()
                cy.get('html').should('not.contain', 'url')
                cy.get('html').should('not.contain', 'likes')
                cy.get('html').should('not.contain', 'user')
            })
        })
    })
})