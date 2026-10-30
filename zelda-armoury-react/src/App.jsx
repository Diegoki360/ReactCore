
import { useState, useEffect } from "react";
import { obtenerArmas } from "./api";
import ListaArmas from "./components/ListaArmas";
import Filtros from "./components/Filtros";
import { useLocalStorage } from "./hooks/useLocalStorage";
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

    // ESTADOS

    const [armas, setArmas] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);

    const [busqueda, setBusqueda] = useState("");
    const [tipo, setTipo] = useState("");
    const [zona, setZona] = useState("");

    const [soloFavoritos, setSoloFavoritos] = useState(false);

    const [favoritos, setFavoritos] = useLocalStorage("favoritos", []);


    // AÑADIR O QUITAR FAVORITOS

    function alternarFavorito(id) {
        setFavoritos(anteriores =>
            anteriores.includes(id)
                ? anteriores.filter(favorito => favorito !== id)
                : [...anteriores, id]
        );
    }


    // CARGA DE DATOS DESDE LA API

    useEffect(() => {
        let activo = true;

        async function cargarArmas() {
            try {
                const datos = await obtenerArmas();

                if (activo) {
                    setArmas(datos);
                }

            } catch (err) {
                if (activo) {
                    setError(err.message);
                }

            } finally {
                if (activo) {
                    setCargando(false);
                }
            }
        }

        cargarArmas();

        return () => {
            activo = false;
        };
    }, []);


    // OPCIONES DE LOS FILTROS

    const tipos = [...new Set(armas.map(obtenerTipo))].sort();

    const zonas = obtenerZonas(armas);


    // FILTRADO DE ARMAS

    const armasFiltradas = filtrarPorNombre(
        filtrarPorTipo(
            filtrarPorZona(armas, zona),
            tipo
        ),
        busqueda
    );


    // FILTRO DE FAVORITOS

    const armasVisibles = soloFavoritos
        ? armasFiltradas.filter(arma => favoritos.includes(arma.id))
        : armasFiltradas;


    // ESTADÍSTICAS

    const totalArmas = armasVisibles.length;

    const resumenTipos = contarPorTipo(armasVisibles);


    // INTERFAZ

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

                        <p>
                            {Object.entries(resumenTipos)
                                .map(([tipo, cantidad]) =>
                                    `${tipo}: ${cantidad}`
                                )
                                .join(" | ")}
                        </p>
                    </section>

                    <button
                        type="button"
                        className="filtro-favoritos"
                        onClick={() =>
                            setSoloFavoritos(anterior => !anterior)
                        }
                    >
                        {soloFavoritos
                            ? "Mostrar todas"
                            : "❤️ Solo favoritos"}
                    </button>

                    {totalArmas > 0 ? (
                        <ListaArmas
                            armas={armasVisibles}
                            favoritos={favoritos}
                            alternarFavorito={alternarFavorito}
                        />
                    ) : (
                        <p>No se ha encontrado equipamiento.</p>
                    )}
                </>
            )}
        </main>
    );
}

export default App;
