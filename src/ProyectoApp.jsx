import { useState, useEffect } from 'react'
import Productos from './components/RenderProductos'
import SearchBar from './components/SearchBar'

export const ProyectoApp = () => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [categoriaActiva, setCategoriaActiva] = useState("todas")
    const [productosFiltrados, setProductosFiltrados] = useState([])

    
    useEffect(() => {
        const cargar = async () => {
            try {
                const res = await fetch("https://dummyjson.com/products")
                const json = await res.json()
                setData(json.products)
                setProductosFiltrados(json.products) 
            } catch (err) {
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }
        cargar()
    }, [])

    const categorias = ["todas", ...new Set(data.map((p) => p.category))]

    return (
        <div>
            <h1>Mini Ecomerce</h1>

            <SearchBar
                products={data}
                selectedCategory={categoriaActiva === "todas" ? null : categoriaActiva}
                onResults={setProductosFiltrados}
            />

            <Productos
                productos={productosFiltrados}
                categorias={categorias}
                categoriaActiva={categoriaActiva}
                setCategoriaActiva={setCategoriaActiva}
                loading={loading}
                error={error}
            />
        </div>
    )
}