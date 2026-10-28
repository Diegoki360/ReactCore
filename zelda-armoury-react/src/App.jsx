import { useState, useEffect } from "react";
import { obtenerArmas } from "./api";
import ListaArmas from "./components/ListaArmas";
import Filtros from "./components/Filtros";
import "./App.css";

import {
    obtenerTipo,
    obtenerZonas,
    filtrarPorZona,
    filtrarPorTipo,
    filtrarPorNombre,
    contarPorTipo
} from "./logic.js";

function App() {
    const [armas, setArmas] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);

    const [busqueda, setBusqueda] = useState("");
    const [tipo, setTipo] = useState("");
    const [zona, setZona] = useState("");

    useEffect(() => {
        async function cargarArmas() {
            
            try {

                const datos = await obtenerArmas();
                setArmas(datos);

            } catch (err) {

                setError(err.message);

            } finally {

                setCargando(false);

            }
        }

        cargarArmas();

        return;
    }, []);

    const tipos = [...new Set(armas.map(obtenerTipo))].sort();

    const zonas = obtenerZonas(armas);

    const armasFiltradas = filtrarPorNombre(
    filtrarPorTipo(
            filtrarPorZona(armas, zona),
            tipo
        ),
        busqueda
    );

    const totalArmas = armasFiltradas.length;

    const resumenTipos = contarPorTipo(armasFiltradas);

    return (
        <main>
            <h1>Zelda Armory</h1>

            <Filtros
                busqueda={busqueda}
                setBusqueda={setBusqueda}
                tipo={tipo}
                setTipo={setTipo}
                zona={zona}
                setZona={setZona}
                tipos={tipos}
                zonas={zonas}
            />

            {cargando ? (
                <p>Cargando equipamiento...</p>
            ) : error ? (
                <p>Error al cargar las armas: {error}</p>
            ) : (
                <>
                    <section className="resumen-armas">
                        <p>
                            Equipamiento encontrado: {totalArmas}
                        </p>
                    </section>

                    {totalArmas > 0 ? (
                        <ListaArmas armas={armasFiltradas} />
                    ) : (
                        <p>No se ha encontrado equipamiento.</p>
                    )}
                </>
            )}
        </main>
    );
}

export default App;
