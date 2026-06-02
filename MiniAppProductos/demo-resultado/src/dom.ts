import { formatearCategoria, formatearMoneda } from "./formatters";
import { CATEGORIAS, type Categoria, type Producto } from "./types";

const form = document.querySelector<HTMLFormElement>("#form-producto");
const nombre = document.querySelector<HTMLInputElement>("#nombre");
const precio = document.querySelector<HTMLInputElement>("#precio");
const stock = document.querySelector<HTMLInputElement>("#stock");
const categoria = document.querySelector<HTMLSelectElement>("#categoria");
const lista = document.querySelector<HTMLUListElement>("#lista-productos");
const estadoVacio = document.querySelector<HTMLParagraphElement>("#estado-vacio");
const contador = document.querySelector<HTMLDivElement>("#contador-categorias");

if (!form || !nombre || !precio || !stock || !categoria || !lista || !estadoVacio || !contador) {
    throw new Error("Faltan elementos en el HTML.");
}

export const elementos = { form, nombre, precio, stock, categoria, lista, estadoVacio, contador };

export function mostrarError(id: string, mensaje: string): void {
    const error = document.querySelector<HTMLParagraphElement>(`#error-${id}`);
    if (!error) return;
    error.textContent = mensaje;
    error.parentElement?.classList.toggle("invalido", mensaje.length > 0);
}

export function limpiarErrores(): void {
    mostrarError("nombre", "");
    mostrarError("precio", "");
    mostrarError("stock", "");
    mostrarError("categoria", "");
}

function crearProducto(producto: Producto): HTMLLIElement {
    const li = document.createElement("li");
    li.className = "producto";
    const nombre = document.createElement("span");
    nombre.className = "nombre";
    nombre.textContent = producto.nombre;
    const precio = document.createElement("span");
    precio.className = "precio";
    precio.textContent = formatearMoneda(producto.precio);
    const meta = document.createElement("span");
    meta.className = "meta";
    const tag = document.createElement("span");
    tag.className = "categoria-tag";
    tag.textContent = formatearCategoria(producto.categoria);
    const stock = document.createElement("span");
    stock.textContent = `Stock: ${producto.stock} unidades`;
    const boton = document.createElement("button");
    boton.type = "button";
    boton.className = "btn-eliminar";
    boton.textContent = "Eliminar";
    boton.dataset.id = String(producto.id);
    meta.append(tag, stock);
    li.append(nombre, precio, meta, boton);
    return li;
}

export function renderizar(productos: Producto[]): void {
    elementos.lista.replaceChildren(...productos.map(crearProducto));
    elementos.estadoVacio.classList.toggle("oculto", productos.length > 0);
}

export function actualizarContador(productos: Producto[]): void {
    const conteo: Record<Categoria, number> = { electronica: 0, ropa: 0, alimentos: 0 };
    productos.forEach((producto) => conteo[producto.categoria]++);
    CATEGORIAS.forEach((cat) => {
        const item = elementos.contador.querySelector<HTMLSpanElement>(`[data-cat="${cat}"]`);
        if (item) item.textContent = `${formatearCategoria(cat)}: ${conteo[cat]}`;
    });
}
