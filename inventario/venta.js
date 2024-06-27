document.addEventListener('DOMContentLoaded', function () {
    const selectCliente = document.getElementById('selectCliente');
    const selectProducto = document.getElementById('selectProducto');
    const cantidadProducto = document.getElementById('cantidadProducto');
    const selectEnvio = document.getElementById('selectEnvio');
    const formVenta = document.getElementById('formVenta');
    const clienteDetalle = document.getElementById('clienteDetalle');
    const productoDetalle = document.getElementById('productoDetalle');
    const mensajeEnvio = document.getElementById('mensajeEnvio');
    const finalizarVentaBtn = document.getElementById('finalizarVenta');
    const listaVentas = document.getElementById('listaVentas');

    let ventasRealizadas = [];

    function fetchClientes() {
        fetch('https://localhost:7103/api/Clientes')
            .then(response => response.json())
            .then(clientes => {
                selectCliente.innerHTML = '<option value="">Seleccionar Cliente</option>';
                clientes.forEach(cliente => {
                    const option = document.createElement('option');
                    option.value = cliente.id;
                    option.textContent = cliente.name;
                    option.setAttribute('data-email', cliente.email);
                    option.setAttribute('data-direccion', cliente.direction);
                    selectCliente.appendChild(option);
                });
            })
            .catch(error => console.error('Error al obtener clientes:', error));
    }

    function fetchProductos() {
        fetch('https://localhost:7103/api/Productos')
            .then(response => response.json())
            .then(productos => {
                selectProducto.innerHTML = '<option value="">Seleccionar Producto</option>';
                productos.forEach(producto => {
                    const option = document.createElement('option');
                    option.value = producto.id;
                    option.textContent = producto.name;
                    option.setAttribute('data-precio', producto.price);
                    selectProducto.appendChild(option);
                });
            })
            .catch(error => console.error('Error al obtener productos:', error));
    }

    formVenta.addEventListener('submit', function (event) {
        event.preventDefault();

        const clienteSeleccionado = selectCliente.options[selectCliente.selectedIndex];
        const productoSeleccionado = selectProducto.options[selectProducto.selectedIndex];
        const cantidad = parseInt(cantidadProducto.value);

        const venta = {
            cliente: clienteSeleccionado.textContent,
            clienteEmail: clienteSeleccionado.getAttribute('data-email'),
            clienteDireccion: clienteSeleccionado.getAttribute('data-direccion'),
            producto: productoSeleccionado.textContent,
            productoPrecio: parseFloat(productoSeleccionado.getAttribute('data-precio')),
            cantidad: cantidad,
            tipoEnvio: selectEnvio.value
        };

        const total = venta.productoPrecio * venta.cantidad;

        // Mostrar detalle de la venta solo al hacer clic en "Ver Detalle"
        clienteDetalle.innerHTML = `
            <p><strong>Cliente:</strong> ${venta.cliente}</p>
            <p><strong>Email:</strong> ${venta.clienteEmail}</p>
            <p><strong>Dirección:</strong> ${venta.clienteDireccion}</p>
        `;

        productoDetalle.innerHTML = `
            <p><strong>Producto:</strong> ${venta.producto}</p>
            <p><strong>Precio:</strong> $${venta.productoPrecio}</p>
        `;

        if (venta.tipoEnvio === 'retiro') {
            mensajeEnvio.textContent = 'En 48 horas hábiles, ir a sucursal de Ferremax solicitando su producto.';
        } else if (venta.tipoEnvio === 'despacho') {
            mensajeEnvio.textContent = 'Dentro de 72 horas se realizará el despacho a la dirección del cliente.';
        }

        console.log('Venta detalle mostrado:', venta);
    });

    finalizarVentaBtn.addEventListener('click', function () {
        const clienteSeleccionado = selectCliente.options[selectCliente.selectedIndex];
        const productoSeleccionado = selectProducto.options[selectProducto.selectedIndex];
        const cantidad = parseInt(cantidadProducto.value);

        const venta = {
            cliente: clienteSeleccionado.textContent,
            clienteEmail: clienteSeleccionado.getAttribute('data-email'),
            clienteDireccion: clienteSeleccionado.getAttribute('data-direccion'),
            producto: productoSeleccionado.textContent,
            productoPrecio: parseFloat(productoSeleccionado.getAttribute('data-precio')),
            cantidad: cantidad,
            tipoEnvio: selectEnvio.value
        };

        const total = venta.productoPrecio * venta.cantidad;

        // Agregar venta al listado de ventas realizadas
        ventasRealizadas.push({
            cliente: venta.cliente,
            producto: venta.producto,
            cantidad: venta.cantidad,
            total: total,
            tipoEnvio: venta.tipoEnvio
        });

        // Mostrar en la lista de ventas realizadas
        renderizarVentasRealizadas();

        // Limpiar detalle de la venta
        limpiarDetalleVenta();

        console.log('Venta finalizada:', venta);
    });

    function renderizarVentasRealizadas() {
        listaVentas.innerHTML = '';
        ventasRealizadas.forEach(venta => {
            const ventaItem = document.createElement('div');
            ventaItem.classList.add('venta-item');
            ventaItem.innerHTML = `
                <p><strong>Cliente:</strong> ${venta.cliente}</p>
                <p><strong>Producto:</strong> ${venta.producto} - Cantidad: ${venta.cantidad}</p>
                <p><strong>Total:</strong> $${venta.total.toFixed(2)}</p>
                <p><strong>Tipo de Envío:</strong> ${venta.tipoEnvio === 'retiro' ? 'Retiro en Sucursal' : 'Despacho a Domicilio'}</p>
            `;
            listaVentas.appendChild(ventaItem);
        });
    }

    function limpiarDetalleVenta() {
        clienteDetalle.innerHTML = '';
        productoDetalle.innerHTML = '';
        mensajeEnvio.textContent = '';
    }

    // Cargar clientes y productos al cargar la página
    fetchClientes();
    fetchProductos();
});

const carouselImages = document.querySelector('.carousel-images');
const images = document.querySelectorAll('.carousel-images img');
let index = 0;

function nextImage() {
    index++;
    if (index >= images.length) {
        index = 0;
    }
    carouselImages.style.transform = `translateX(${-index * 100}%)`;
}

setInterval(nextImage, 7000);
