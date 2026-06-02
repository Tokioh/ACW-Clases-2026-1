export type Categoria = "electronica" | "ropa" | "alimentos";

export interface Producto {
    id: number;
    nombre: string;
    precio: number;
    stock: number;
    categoria: Categoria;
}

export type Resultado<T> = { ok: true; valor: T } | { ok: false; error: string };

export const CATEGORIAS: readonly Categoria[] = ["electronica", "ropa", "alimentos"];
