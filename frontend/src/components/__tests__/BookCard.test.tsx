import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'

// WHAT: Simple BookCard component for testing
// WHY: Demonstrate component testing patterns
// HOW: Create a basic component to test
interface BookCardProps {
  title: string
  author: string
  price: number
  coverImage?: string
}

const BookCard = ({ title, author, price, coverImage }: BookCardProps) => {
  return (
    <div className="book-card" data-testid="book-card">
      {coverImage && <img src={coverImage} alt={title} />}
      <h3>{title}</h3>
      <p className="author">By {author}</p>
      <p className="price">${price.toFixed(2)}</p>
    </div>
  )
}

describe('BookCard Component', () => {
  const mockBook = {
    title: 'Test Book',
    author: 'Test Author',
    price: 29.99,
  }

  it('should render book title', () => {
    render(<BookCard {...mockBook} />)

    const title = screen.getByText('Test Book')
    expect(title).toBeInTheDocument()
    expect(title.tagName).toBe('H3')
  })

  it('should render book author', () => {
    render(<BookCard {...mockBook} />)

    const author = screen.getByText(/by test author/i)
    expect(author).toBeInTheDocument()
  })

  it('should render book price formatted correctly', () => {
    render(<BookCard {...mockBook} />)

    const price = screen.getByText('$29.99')
    expect(price).toBeInTheDocument()
  })

  it('should render cover image when provided', () => {
    render(<BookCard {...mockBook} coverImage="/test-cover.jpg" />)

    const image = screen.getByAltText('Test Book')
    expect(image).toBeInTheDocument()
    expect(image).toHaveAttribute('src', '/test-cover.jpg')
  })

  it('should not render cover image when not provided', () => {
    render(<BookCard {...mockBook} />)

    const image = screen.queryByRole('img')
    expect(image).not.toBeInTheDocument()
  })

  it('should have correct CSS class', () => {
    render(<BookCard {...mockBook} />)

    const card = screen.getByTestId('book-card')
    expect(card).toHaveClass('book-card')
  })

  it('should format price with two decimal places', () => {
    render(<BookCard {...mockBook} price={10} />)

    const price = screen.getByText('$10.00')
    expect(price).toBeInTheDocument()
  })
})
