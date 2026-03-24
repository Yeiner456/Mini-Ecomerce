import { useState, useEffect } from 'react'
import '../styles/SearchBar.css'

export default function SearchBar({
    products = [],
    selectedCategory = null,
    soloConDescuento = false,
    onResults,
    placeholder = 'Buscar productos...',
}) {
    const [query, setQuery] = useState('')
    const [isFocused, setIsFocused] = useState(false)

    useEffect(() => {
        const q = query.trim().toLowerCase()

        const results = products.filter((product) => {
            const matchesCategory = selectedCategory
                ? product.category?.toLowerCase() === selectedCategory.toLowerCase()
                : true


            const matchesQuery = q
                ? product.title?.toLowerCase().includes(q) ||
                product.description?.toLowerCase().includes(q) ||
                product.category?.toLowerCase().includes(q)
                : true

            const matchesDescuento = soloConDescuento
                ? product.discountPercentage >= 10
                : true
            return matchesCategory && matchesQuery && matchesDescuento
        })

        onResults?.(results)
    }, [query, selectedCategory, soloConDescuento, products])

    return (
        <div className={`search-bar ${isFocused ? 'search-bar--focused' : ''}`}>
            <div className="search-bar__icon">
                <SearchIcon />
            </div>

            <input
                type="text"
                className="search-bar__input"
                placeholder={placeholder}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                aria-label="Buscar productos"
            />

        </div>
    )
}

function SearchIcon() {
    return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
    )
}
