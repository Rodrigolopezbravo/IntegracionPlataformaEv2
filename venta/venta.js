document.addEventListener('DOMContentLoaded', function () {
    const selectCliente = document.getElementById('selectCliente');
    const selectProducto = document.getElementById('selectProducto');
    const selectEnvio = document.getElementById('selectEnvio');
    const formVenta = document.getElementById('formVenta');
    const clienteDetalle = document.getElementById('clienteDetalle');
    const productoDetalle = document.getElementById('productoDetalle');
    const mensajeEnvio = document.getElementById('mensajeEnvio');

    // Función para cargar clientes desde la API y obtener su información completa
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

    // Función para cargar productos desde la API y obtener su nombre y precio
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

    // Manejar envío de formulario de venta
    formVenta.addEventListener('submit', function (event) {
        event.preventDefault();

        const clienteSeleccionado = selectCliente.options[selectCliente.selectedIndex];
        const productoSeleccionado = selectProducto.options[selectProducto.selectedIndex];

        const venta = {
            cliente: clienteSeleccionado.textContent,
            clienteEmail: clienteSeleccionado.getAttribute('data-email'),
            clienteDireccion: clienteSeleccionado.getAttribute('data-direccion'),
            producto: productoSeleccionado.textContent,
            productoPrecio: productoSeleccionado.getAttribute('data-precio'),
            tipoEnvio: selectEnvio.value
        };

        // Mostrar detalle de la venta
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

        console.log('Venta realizada:', venta);
        // Aquí puedes realizar la lógica adicional para procesar la venta

        // Por ejemplo, podrías hacer un fetch a otra API para registrar la venta

        // Una vez procesada la venta, podrías reiniciar el formulario o realizar otras acciones necesarias
        // formVenta.reset();
    });

    // Cargar clientes y productos al cargar la página
    fetchClientes();
    fetchProductos();
});
