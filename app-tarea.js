// ============================================
// CARRITO DE COMPRAS - SIN DUPLICADOS
// ============================================

let carrito = [];

const cuerpoCarrito = document.getElementById('cuerpo-carrito');
const totalCarrito = document.getElementById('total-carrito');
const botonesAgregar = document.querySelectorAll('.btn-agregar');

// ============================================
// AGREGAR AL CARRITO (SIN DUPLICADOS)
// ============================================
function agregarAlCarrito(nombre, precio, boton) {
    // Verificamos si YA EXISTE en el carrito
    const yaExiste = carrito.find(item => item.nombre === nombre);

    if (yaExiste) {
        // ❌ NO lo agregamos. Mostramos aviso.
        mostrarAviso(boton, '⚠️ Ya está en el carrito', 'warning');
        return;
    }

    // ✅ Si NO existe, lo agregamos
    carrito.push({
        nombre: nombre,
        precio: precio
    });

    // Feedback visual en el botón
    mostrarAviso(boton, '✓ Agregado', 'success');

    renderizarCarrito();
}

// ============================================
// ELIMINAR DEL CARRITO
// ============================================
function eliminarDelCarrito(nombre) {
    carrito = carrito.filter(item => item.nombre !== nombre);
    renderizarCarrito();
}

// ============================================
// CALCULAR TOTAL
// ============================================
function calcularTotal() {
    let total = 0;
    carrito.forEach(item => {
        total += item.precio;
    });
    return total;
}

// ============================================
// RENDERIZAR CARRITO
// ============================================
function renderizarCarrito() {
    cuerpoCarrito.innerHTML = '';

    if (carrito.length === 0) {
        cuerpoCarrito.innerHTML = `
            <tr>
                <td colspan="3" class="text-center text-muted py-4">
                    🛒 Tu carrito está vacío
                </td>
            </tr>
        `;
        totalCarrito.textContent = '0';
        return;
    }

    carrito.forEach(item => {
        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td><strong>${item.nombre}</strong></td>
            <td class="text-primary fw-bold">$${item.precio}</td>
            <td>
                <button class="btn btn-danger btn-sm btn-eliminar" data-nombre="${item.nombre}">
                    ✕
                </button>
            </td>
        `;
        cuerpoCarrito.appendChild(fila);
    });

    totalCarrito.textContent = calcularTotal();

    // Eventos de eliminar
    document.querySelectorAll('.btn-eliminar').forEach(boton => {
        boton.addEventListener('click', (e) => {
            const nombre = e.target.getAttribute('data-nombre');
            eliminarDelCarrito(nombre);
        });
    });
}

// ============================================
// MOSTRAR AVISO TEMPORAL EN EL BOTÓN
// ============================================
function mostrarAviso(boton, mensaje, tipo) {
    const textoOriginal = boton.textContent;
    const clasesOriginales = boton.className;

    boton.textContent = mensaje;
    boton.className = `btn w-100 btn-${tipo}`;
    boton.disabled = true;

    // Volver al estado original después de 1.5 segundos
    setTimeout(() => {
        boton.textContent = textoOriginal;
        boton.className = clasesOriginales;
        boton.disabled = false;
    }, 1500);
}

// ============================================
// EVENTOS: BOTONES AGREGAR
// ============================================
botonesAgregar.forEach(boton => {
    boton.addEventListener('click', (e) => {
        const nombre = e.target.getAttribute('data-nombre');
        const precio = parseInt(e.target.getAttribute('data-precio'));
        agregarAlCarrito(nombre, precio, e.target);
    });
});

// ============================================
// INICIALIZACIÓN
// ============================================
renderizarCarrito();