import React from 'react'
import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'

import Blog from './Blog'

describe('Blog', () => {
    let component = null
    let handleLike = null
    let handleRemove = null

    beforeEach(() => {
        const blog = {
            title: 'Component testing is done with react-testing-library',
            author: 'Author',
            url: 'https://example.com',
            likes: 0,
            user: {
                username: 'username',
                name: 'name'
            }
        }

        // Suppress prop type warnings
        handleLike = jest.fn()
        handleRemove = jest.fn()

        component = render(<Blog blog={blog} handleLike={handleLike} handleRemove={handleRemove}/>)
    })

    test('renders title', () => {
        expect(component.container).toHaveTextContent(
            'Component testing is done with react-testing-library'
        )
        expect(component.container).toHaveTextContent(
            'Author'
        )
        expect(component.container).not.toHaveTextContent(
            'https://example.com'
        )
        expect(component.container).not.toHaveTextContent(
            '0'
        )
    })

    test('renders additional info when view button is clicked', async () => {
        const user = userEvent.setup()
        const button = component.getByText('view')
        await user.click(button)

        expect(component.container).toHaveTextContent(
            'Component testing is done with react-testing-library'
        )
        expect(component.container).toHaveTextContent(
            'https://example.com'
        )
        expect(component.container).toHaveTextContent(
            '0'
        )

        const likeButton = component.getByText('like')
        expect(likeButton).toBeDefined()
    })

    test('clicking like button twice calls event handler twice', async () => {
        const user = userEvent.setup()
        const viewButton = component.getByText('view')
        await user.click(viewButton)

        const likeButton = component.getByText('like')
        await user.click(likeButton)
        await user.click(likeButton)

        expect(handleLike.mock.calls).toHaveLength(2)
    })
})
