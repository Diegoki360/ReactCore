import { useState, useEffect } from "react";

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

    useEffect(() => {
        try {
            localStorage.setItem(clave, JSON.stringify(valor));
        } catch (error) {
            console.error("Error guardando en localStorage:", error);
        }
    }, [clave, valor]);

    return [valor, setValor];
}