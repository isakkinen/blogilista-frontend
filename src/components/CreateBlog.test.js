import React from 'react'
import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import CreateBlog from './CreateBlog'

describe('CreateBlog', () => {
    let component = null
    let handleSubmit = null
    let handleCancel = null

    beforeEach(() => {
        handleSubmit = jest.fn()
        handleCancel = jest.fn()

        component = render(<CreateBlog handleCancel={handleCancel} handleSubmit={handleSubmit}/>)
    })

    test('renders content', () => {
        expect(component.container).toHaveTextContent(
            'Add a new blog'
        )
    })

    test('calls event handler with right details when a new blog is created', async () => {
        const user = userEvent.setup()
        // const form = component.container.querySelector('form')
        const submit = component.container.querySelector('#submit')
        const title = component.container.querySelector('#title')
        const author = component.container.querySelector('#author')
        const url = component.container.querySelector('#url')

        await user.type(title, 'Component testing is done with react-testing-library')
        await user.type(author, 'Author')
        await user.type(url, 'https://example.com')
        await user.click(submit)

        expect(handleSubmit.mock.calls).toHaveLength(1)
        expect(handleSubmit.mock.calls[0][1]).toEqual('Component testing is done with react-testing-library')
        expect(handleSubmit.mock.calls[0][2]).toEqual('Author')
        expect(handleSubmit.mock.calls[0][3]).toEqual('https://example.com')
    })
})
