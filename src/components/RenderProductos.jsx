// Productos.jsx
import { useState, useEffect } from "react";
import "../styles/RenderProductos.css";

function Productos() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [seleccionado, setSeleccionado] = useState(null);
    const [categoriaActiva, setCategoriaActiva] = useState("todas");

    useEffect(() => {
        const cargar = async () => {
            try {
                const res = await fetch("https://dummyjson.com/products");
                const json = await res.json();
                setData(json.products);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        cargar();
    }, []);

    const categorias = ["todas", ...new Set(data.map((p) => p.category))];

    const productosFiltrados = categoriaActiva === "todas"
        ? data
        : data.filter((p) => p.category === categoriaActiva);

    if (loading) return <p>Cargando productos...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>

            {seleccionado && (
                <div className="modal-overlay" onClick={() => setSeleccionado(null)}>
                    <div className="modal-contenido" onClick={(e) => e.stopPropagation()}>
                        <button className="modal-cerrar" onClick={() => setSeleccionado(null)}>✕</button>
                        <img src={seleccionado.thumbnail} alt={seleccionado.title} />
                        <h2>{seleccionado.title}</h2>
                        <p className="categoria">{seleccionado.category} — {seleccionado.brand}</p>
                        <p className="descripcion">{seleccionado.description}</p>
                        <p className="precio">${seleccionado.price}</p>
                        <p className="descuento">Descuento: {seleccionado.discountPercentage}%</p>
                        <p className="rating-stock">⭐ {seleccionado.rating} — Stock: {seleccionado.stock}</p>
                    </div>
                </div>
            )}

            <div className="filtros">
                {categorias.map((cat) => (
                    <button
                        key={cat}
                        className={`filtro-btn ${categoriaActiva === cat ? "activo" : ""}`}
                        onClick={() => setCategoriaActiva(cat)}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            <div className="productos-grid">
                {productosFiltrados.map((producto) => (
                    <div
                        key={producto.id}
                        className="producto-card"
                        onClick={() => setSeleccionado(producto)}
                    >
                        <img src={producto.thumbnail} alt={producto.title} />
                        <h3>{producto.title}</h3>
                        <p className="categoria">{producto.category}</p>
                        <p className="descripcion">{producto.description}</p>
                        <p className="precio">${producto.price}</p>
                        <p className="descuento">Descuento: {producto.discountPercentage}%</p>
                        <p className="rating-stock">⭐ {producto.rating} — Stock: {producto.stock}</p>
                        <p className="marca">Marca: {producto.brand}</p>
                    </div>
                ))}
            </div>

        </div>
    );
}

export default Productos;