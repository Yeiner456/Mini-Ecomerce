import { useState, useEffect } from 'react'
import Productos from './components/RenderProductos.jsx'
import SearchBar from './components/SearchBar.jsx'
import DescuentoCheckbox from './components/ConDescuento.jsx'

export const ProyectoApp = () => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [categoriaActiva, setCategoriaActiva] = useState("todas")
    const [productosFiltrados, setProductosFiltrados] = useState([])
    const [soloConDescuento, setSoloConDescuento] = useState(false)  // ← nuevo

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
                soloConDescuento={soloConDescuento}
                onResults={setProductosFiltrados}
            />

            {/* El checkbox vive aquí, su estado sube a ProyectoApp */}
            <DescuentoCheckbox
                checked={soloConDescuento}
                onChange={setSoloConDescuento}
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