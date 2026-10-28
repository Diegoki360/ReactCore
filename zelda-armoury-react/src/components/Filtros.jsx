function Filtros({ busqueda, setBusqueda, tipo, setTipo, zona, setZona, tipos, zonas }) {
    return (
        <section className="filtros">
            <input
                type="text"
                placeholder="Buscar equipamiento..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
            />

            <select value={tipo} onChange={(e) => setTipo(e.target.value)}>
                <option value="">Todos los tipos</option>

                {tipos.map((tipo) => (
                    <option key={tipo} value={tipo}>
                        {tipo}
                    </option>
                ))}
            </select>

            <select value={zona} onChange={(e) => setZona(e.target.value)}>
                <option value="">Todas las zonas</option>

                {zonas.map((zona) => (
                    <option key={zona} value={zona}>
                        {zona}
                    </option>
                ))}
            </select>
        </section>
    );
}

export default Filtros;