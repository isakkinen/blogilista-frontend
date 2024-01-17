describe('Blog app', () => {
    const user = {
        name: 'Iisakki Säkkinen',
        username: 'tester',
        password: 'salainen'
    }
    const user2 = {
        name: 'Another User',
        username: 'another',
        password: 'salainen'
    }
    beforeEach(function() {
        cy.request('POST', 'http://localhost:3003/api/testing/reset')
        cy.request('POST', 'http://localhost:3003/api/users', user)
        cy.request('POST', 'http://localhost:3003/api/users', user2)
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
            beforeEach(function() {
                cy.createBlog({ title: 'A blog created by cypress', author: 'Cypress', url: 'https://example.com' })
            })

            it('A blog can be liked', function() {
                cy.contains('view').click()
                cy.contains('like').click()
                cy.contains('1')
            })

            it('A blog can be removed by the user', function() {
                cy.contains('view').click()
                cy.get('#remove').click()
                cy.get('html').should('not.contain', 'url')
                cy.get('html').should('not.contain', 'likes')
                cy.get('html').should('not.contain', 'user')
            })

            it('A blog cannot be removed by another user', function() {
                cy.contains('logout').click()
                cy.login({ username: user2.username, password: user2.password })
                cy.contains('view').click()
                cy.get('#remove').should('not.exist')
            })
        })

        describe('When multiple blogs exist', function() {
            beforeEach(function() {
                cy.createBlog({ title: 'A blog created by cypress', author: 'Cypress', url: 'https://example.com' })
                cy.createBlog({ title: 'Another blog created by cypress', author: 'Cypress', url: 'https://example.com' })
                cy.createBlog({ title: 'Yet another blog created by cypress', author: 'Cypress', url: 'https://example.com' })
            })

            it('Blogs are ordered by likes', function() {
                cy.get('.blog').eq(0).contains('A blog created by cypress').parent().as('blog1')
                cy.get('.blog').eq(1).contains('Another blog created by cypress')
                cy.get('.blog').eq(2).contains('Yet another blog created by cypress')

                cy.get('@blog1').contains('view').click()
                cy.get('@blog1').contains('like').click()

                cy.get('.blog').eq(1).contains('Another blog created by cypress').as('blog2')

                cy.get('@blog2').contains('view').click()
                cy.get('@blog2').contains('like').click()
                cy.get('@blog2').contains('like').click()

                cy.get('.blog').eq(0).contains('Another blog created by cypress')
                cy.get('.blog').eq(1).contains('A blog created by cypress')
                cy.get('.blog').eq(2).contains('Yet another blog created by cypress')
            })
        })
    })
})