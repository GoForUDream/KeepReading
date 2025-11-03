import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import Home from '../Home'

// WHAT: Helper function to render with Router
// WHY: Home component uses react-router-dom Link components
// HOW: Wrap component in BrowserRouter
const renderWithRouter = (component: React.ReactElement) => {
  return render(<BrowserRouter>{component}</BrowserRouter>)
}

describe('Home Page', () => {
  it('should render the main heading', () => {
    renderWithRouter(<Home />)

    // WHAT: Check if heading exists
    // WHY: Verify page loads correctly
    // HOW: Look for text with regex (case-insensitive)
    const heading = screen.getByText(/welcome to keep reading/i)
    expect(heading).toBeInTheDocument()
  })

  it('should render navigation links', () => {
    renderWithRouter(<Home />)

    // WHAT: Check for Browse Books link
    const browseBooksLink = screen.getByRole('link', { name: /browse books/i })
    expect(browseBooksLink).toBeInTheDocument()
    expect(browseBooksLink).toHaveAttribute('href', '/books')
  })

  it('should display feature cards', () => {
    renderWithRouter(<Home />)

    // WHAT: Check if feature sections exist
    // WHY: Verify all main features are displayed
    // HOW: Use getAllByText since these words appear in multiple places
    expect(screen.getAllByText(/vast collection/i).length).toBeGreaterThan(0)
    expect(screen.getAllByText(/fast delivery/i).length).toBeGreaterThan(0)
    expect(screen.getAllByText(/secure payment/i).length).toBeGreaterThan(0)
  })

  it('should render the bookstore description', () => {
    renderWithRouter(<Home />)

    // WHAT: Check for description text
    const description = screen.getByText(/your professional online bookstore/i)
    expect(description).toBeInTheDocument()
  })
})
