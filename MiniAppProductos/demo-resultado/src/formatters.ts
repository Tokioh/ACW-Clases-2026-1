export function formatearMoneda(n: number): string {
    return new Intl.NumberFormat("es-EC", {
        style: "currency",
        currency: "USD",
    }).format(n);
}

export function formatearCategoria(categoria: string): string {
    return categoria.charAt(0).toUpperCase() + categoria.slice(1);
}
