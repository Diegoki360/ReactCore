import { useState } from "react";

export function useLocalStorage(clave, valorInicial) {

    const [valor, setValor] = useState(() => {
        try {
            const guardado = localStorage.getItem(clave);

            return guardado !== null
                ? JSON.parse(guardado)
                : valorInicial;

        } catch {
            return valorInicial;
        }
    });

    function actualizarValor(nuevoValor) {
        setValor(valorAnterior => {
            const resultado = typeof nuevoValor === "function"
                ? nuevoValor(valorAnterior)
                : nuevoValor;

            try {
                localStorage.setItem(clave, JSON.stringify(resultado));
            } catch (error) {
                console.error("Error guardando favoritos:", error);
            }

            return resultado;
        });
    }

    return [valor, actualizarValor];
}