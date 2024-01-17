import React from 'react'
import '@testing-library/jest-dom'
import { render } from '@testing-library/react'

import Blog from './Blog'

describe('Blog', () => {
    test('renders content', () => {
        const blog = {
            title: 'Component testing is done with react-testing-library',
            author: 'Author',
            url: 'https://example.com',
            likes: 0
        }

        // Suppress prop type warnings
        const handleLike = jest.fn()
        const handleRemove = jest.fn()

        const component = render(<Blog blog={blog} handleLike={handleLike} handleRemove={handleRemove}/>)

        expect(component.container).toHaveTextContent(
            'Component testing is done with react-testing-library'
        )
    })
})
