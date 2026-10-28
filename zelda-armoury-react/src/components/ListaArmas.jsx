import ArmaCard from "./ArmaCard";

function ListaArmas({ armas }) {
    return (
        <section className="lista-armas">
            {armas.map((arma) => (
                <ArmaCard key={arma.id} arma={arma} />
            ))}
        </section>
    );
}

export default ListaArmas;