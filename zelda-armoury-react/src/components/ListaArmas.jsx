import ArmaCard from "./ArmaCard";

function ListaArmas({ armas, favoritos, alternarFavorito }) {
    return (
        <section className="lista-armas">
            {armas.map(arma => (
                <ArmaCard
                    key={arma.id}
                    arma={arma}
                    esFavorito={favoritos.includes(arma.id)}
                    alternarFavorito={alternarFavorito}
                />
            ))}
        </section>
    );
}

export default ListaArmas;