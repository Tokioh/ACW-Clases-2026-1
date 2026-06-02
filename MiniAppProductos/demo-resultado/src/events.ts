import { actualizarContador, elementos, limpiarErrores, mostrarError, renderizar } from "./dom";
import type { Producto, Resultado } from "./types";
import { validarCategoria, validarNombre, validarPrecio, validarStock } from "./validators";

const productos: Producto[] = [];

function refrescar(): void {
    renderizar(productos);
    actualizarContador(productos);
}

function tomar<T>(resultado: Resultado<T>, campo: string): T | null {
    if (resultado.ok) {
        mostrarError(campo, "");
        return resultado.valor;
    }
    mostrarError(campo, resultado.error);
    return null;
}

function registrarEnvio(): void {
    elementos.form.addEventListener("submit", (evento) => {
        evento.preventDefault();
        limpiarErrores();
        const nombre = tomar(validarNombre(elementos.nombre.value), "nombre");
        const precio = tomar(validarPrecio(elementos.precio.value), "precio");
        const stock = tomar(validarStock(elementos.stock.value), "stock");
        const categoria = tomar(validarCategoria(elementos.categoria.value), "categoria");
        if (nombre === null || precio === null || stock === null || categoria === null) return;
        productos.push({ id: Date.now(), nombre, precio, stock, categoria });
        elementos.form.reset();
        elementos.nombre.focus();
        refrescar();
    });
}

function registrarDelegacioneEliminar(): void {
    elementos.lista.addEventListener("click", (evento) => {
        const boton = (evento.target as HTMLElement).closest<HTMLButtonElement>(".btn-eliminar");
        if (!boton) return;
        const id = Number(boton.dataset.id);
        const indice = productos.findIndex((producto) => producto.id === id);
        if (indice === -1) return;
        productos.splice(indice, 1);
        refrescar();
    });
}

function registrarValidacionesReactivas(): void {
    elementos.nombre.addEventListener("input", () => tomar(validarNombre(elementos.nombre.value), "nombre"));
    elementos.precio.addEventListener("input", () => tomar(validarPrecio(elementos.precio.value), "precio"));
    elementos.stock.addEventListener("input", () => tomar(validarStock(elementos.stock.value), "stock"));
    elementos.categoria.addEventListener("change", () => tomar(validarCategoria(elementos.categoria.value), "categoria"));
}

export function iniciar(): void {
    registrarEnvio();
    registrarDelegacioneEliminar();
    registrarValidacionesReactivas();
    refrescar();
}
