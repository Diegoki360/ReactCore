export function obtenerTipo(arma) {

    const nombre = (arma.name ?? "").toLowerCase();

    if (nombre.includes("shield")) {
        return "Escudo";
    }

    if (nombre.includes("bow")) {
        return "Arco";
    }

    if (nombre.includes("spear") ||
        nombre.includes("halberd") ||
        nombre.includes("trident")) {
        return "Lanza";
    }

    if (nombre.includes("claymore") ||
        nombre.includes("crusher") ||
        nombre.includes("longsword") ||
        nombre.includes("greatsword")) {
        return "Arma a dos manos";
    }

    if (nombre.includes("sword") ||
        nombre.includes("blade") ||
        nombre.includes("scimitar")) {
        return "Espada";
    }

    return "Otro equipamiento";
}

export function obtenerZonas(armas) {
    const zonas = armas.flatMap(arma => arma.common_locations ?? []);

    return [...new Set(zonas)].toSorted();
}

export function filtrarPorZona(armas, zona) {
    if (zona === "") {
        return armas;
    }

    return armas.filter(arma =>
        arma.common_locations?.includes(zona)
    );
}

export function filtrarPorTipo(armas, tipo) {
    if (tipo === "") {
        return armas;
    }

    return armas.filter(arma => obtenerTipo(arma) === tipo);
}

export function contarPorTipo(armas) {
    return armas.reduce((contador, arma) => {
        const tipo = obtenerTipo(arma);

        if (contador[tipo] === undefined) {
            contador[tipo] = 0;
        }

        contador[tipo]++;

        return contador;
    }, {});
}

export function filtrarPorNombre(armas, texto) {
    const busqueda = texto.toLowerCase().trim();

    return armas.filter(arma =>
        (arma.name ?? "").toLowerCase().includes(busqueda)
    );
}

