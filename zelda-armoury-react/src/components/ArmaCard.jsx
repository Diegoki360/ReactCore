import { useState } from "react";
import { obtenerTipo } from "../logic.js";

function ArmaCard({ arma }) {
    const [mostrarDetalles, setMostrarDetalles] = useState(false);
    return (
        <article className="arma-card">
            <img src={arma.image} alt={arma.name} />

            <h2>{arma.name}</h2>

            <p>Ataque: {arma.properties.attack ?? "???"}</p>
            <p>Defensa: {arma.properties.defense ?? "???"}</p>
            <p>tipo: {obtenerTipo(arma)}</p>

            <details className="arma-detalles">
                <summary>Ver detalles</summary>

                <p>{arma.description || "Sin descripción"}</p>

                <h3>Localizaciones</h3>

                <ul>
                    {(arma.common_locations ?? []).length > 0
                        ? arma.common_locations.map((zona) => (
                            <li key={zona}>{zona}</li>
                        ))
                        : <li>Localización desconocida</li>
                    }
                </ul>
            </details>
        </article>
    );
}

export default ArmaCard;