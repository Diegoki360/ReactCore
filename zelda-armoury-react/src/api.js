const CLAVE_CACHE = "zelda_armas";
const CLAVE_FECHA = "zelda_armas_fecha";
const DURACION_CACHE = 60 * 60 * 1000; // Una hora

export async function obtenerArmas() {

    const datosGuardados = localStorage.getItem(CLAVE_CACHE);
    const fechaGuardada = localStorage.getItem(CLAVE_FECHA);

    if (datosGuardados && fechaGuardada &&
        Date.now() - Number(fechaGuardada) < DURACION_CACHE) {

        try {
            const armasGuardadas = JSON.parse(datosGuardados);

            if (Array.isArray(armasGuardadas)) {
                return armasGuardadas;
            }
        } catch (error) {
            console.warn("La caché no es válida:", error);
        }
    }

    const respuesta = await fetch(
        "https://api.hyrule-compendium.com/v3/compendium/category/equipment?game=botw"
    );

    if (!respuesta.ok) {
        throw new Error("Error al obtener las armas");
    }

    const datos = await respuesta.json();

    if (!Array.isArray(datos.data)) {
        throw new Error("La API no ha devuelto una lista válida");
    }

    try {
        localStorage.setItem(CLAVE_CACHE, JSON.stringify(datos.data));
        localStorage.setItem(CLAVE_FECHA, Date.now().toString());
    } catch (error) {
        console.warn("No se pudo guardar la caché:", error);
    }

    return datos.data;
}