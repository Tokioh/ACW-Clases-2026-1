import { CATEGORIAS, type Categoria, type Resultado } from "./types";

export function validarNombre(input: string): Resultado<string> {
    const limpio = input.trim();
    if (limpio.length === 0) return { ok: false, error: "El nombre es obligatorio." };
    if (limpio.length < 3) return { ok: false, error: "Debe tener al menos 3 caracteres." };
    if (limpio.length > 50) return { ok: false, error: "Maximo 50 caracteres." };
    return { ok: true, valor: limpio };
}

export function validarPrecio(input: string): Resultado<number> {
    const limpio = input.trim();
    if (limpio.length === 0) return { ok: false, error: "El precio es obligatorio." };
    const numero = Number(limpio);
    if (!Number.isFinite(numero)) return { ok: false, error: "Debe ser un numero valido." };
    if (numero <= 0) return { ok: false, error: "Debe ser mayor que cero." };
    if (numero > 1_000_000) return { ok: false, error: "Demasiado alto." };
    return { ok: true, valor: numero };
}

export function validarStock(input: string): Resultado<number> {
    const limpio = input.trim();
    if (limpio.length === 0) return { ok: false, error: "El stock es obligatorio." };
    const numero = Number(limpio);
    if (!Number.isInteger(numero)) return { ok: false, error: "Debe ser un numero entero." };
    if (numero < 0) return { ok: false, error: "No puede ser negativo." };
    return { ok: true, valor: numero };
}

export function validarCategoria(input: string): Resultado<Categoria> {
    if (CATEGORIAS.includes(input as Categoria)) return { ok: true, valor: input as Categoria };
    return { ok: false, error: "Selecciona una categoria valida." };
}
