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
    const [soloConDescuento, setSoloConDescuento] = useState(false)
    const [orden, setOrden] = useState("ninguno") // "ninguno" | "asc" | "desc"

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

    const productosOrdenados = orden === "asc"
        ? [...productosFiltrados].sort((a, b) => a.price - b.price)
        : orden === "desc"
            ? [...productosFiltrados].sort((a, b) => b.price - a.price)
            : productosFiltrados

    const categorias = ["todas", ...new Set(data.map((p) => p.category))]

    return (
        <main>
            <h1>Mini Ecomerce</h1>

            <SearchBar
                products={data}
                selectedCategory={categoriaActiva === "todas" ? null : categoriaActiva}
                soloConDescuento={soloConDescuento}
                onResults={setProductosFiltrados}
            />

            <DescuentoCheckbox
                checked={soloConDescuento}
                onChange={setSoloConDescuento}
            />

            <select
                value={orden}
                onChange={(e) => setOrden(e.target.value)}
            >
                <option value="ninguno">Ordenar por precio</option>
                <option value="asc">Menor a mayor</option>
                <option value="desc">Mayor a menor</option>
            </select>

            <Productos
                productos={productosOrdenados}
                categorias={categorias}
                categoriaActiva={categoriaActiva}
                setCategoriaActiva={setCategoriaActiva}
                loading={loading}
                error={error}
            />
        </main>
    )
}