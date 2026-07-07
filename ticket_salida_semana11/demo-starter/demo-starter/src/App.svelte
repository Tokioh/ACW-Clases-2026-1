<script lang="ts">

  import {onMount} from 'svelte';
  import type { Producto, LineaFactura } from './lib/types';
  import Catalogo from './lib/Catalogo.svelte';
  import Carrito from './lib/Carrito.svelte';
  import { agregarProducto, calcularTotales } from './lib/calculos';
  
  let productos = $state<Producto[]>([]);
  let cargando = $state(true);
  let error = $state("");
  let lineas = $state<LineaFactura[]>([]);
  let totales = $derived(calcularTotales(lineas));
  function onAgregar(producto: Producto) {
    // 🟢 Aquí va la lógica para agregar un producto al carrito
    lineas = agregarProducto(lineas, producto);
  }
  onMount(async () => {
    try {
      const res = await fetch('/productos.json');
      if (!res.ok) throw new Error(`Error ${res.status}: ${res.statusText}`);
      productos = await res.json();
    } catch (err) {
      error = (err as Error).message;
    } finally {
      cargando = false;
    }
  });
  // 🟢 En clase construiremos aquí:
  //   - productos  ($state)
  //   - lineas     ($state)
  //   - cargando / error ($state)
  //   - totales    ($derived)
  //   - carga de datos con onMount + fetch
  //   - función manejarAgregar(p)
</script>

<main>
  <h1>🧾 Mini Facturador — Svelte 5</h1>
  {#if cargando}
    <p class="aviso">Cargando...</p>
  {:else if error}
    <p class="aviso">Error: {error}</p>
  {:else}
  <div class="layout">
    <Catalogo {productos} onAgregar={onAgregar} />
    <Carrito {lineas}
      subtotal={totales.subtotal}
      iva={totales.iva}
      total={totales.total} 
      />
  </div>
  {/if}
</main>

<style>
  main {
    max-width: 900px;
    margin: 2rem auto;
    padding: 0 1rem;
    font-family: system-ui, sans-serif;
  }

  h1 {
    color: #1e2761;
    text-align: center;
    margin-bottom: 1.5rem;
  }

  .aviso {
    text-align: center;
    font-weight: 600;
    padding: 0.75rem;
    background: #f4f7ff;
    border: 1px solid #d9e2ff;
    border-radius: 10px;
  }

  .layout {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 1rem;
    align-items: start;
  }
</style>
