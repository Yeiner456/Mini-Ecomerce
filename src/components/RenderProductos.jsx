import { useState } from "react";
import "../styles/RenderProductos.css";

export default function Productos({ productos, categorias, categoriaActiva, setCategoriaActiva, loading, error }) {
    const [seleccionado, setSeleccionado] = useState(null);

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
                {productos.length === 0 ? (
                    <p>Sin resultados</p>
                ) : (
                    productos.map((producto) => (
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
                    ))
                )}
            </div>
        </div>
    );
}
