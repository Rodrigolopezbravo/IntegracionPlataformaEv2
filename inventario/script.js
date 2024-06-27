document.addEventListener('DOMContentLoaded', function() {
    obtenerClientes();
    obtenerProductos();

    document.getElementById('form-cliente').addEventListener('submit', function(event) {
        event.preventDefault();
        const nombre = document.getElementById('nombre-cliente').value;
        const email = document.getElementById('email-cliente').value;
        const direccion = document.getElementById('direccion-cliente').value;
        agregarCliente(nombre, email, direccion);
    });

    document.getElementById('form-producto').addEventListener('submit', function(event) {
        event.preventDefault();
        const nombre = document.getElementById('nombre-producto').value;
        const precio = document.getElementById('precio-producto').value;
        const stock = document.getElementById('stock-producto').value;
        agregarProducto(nombre, precio, stock);
    });
});

// Función para obtener y mostrar clientes
function obtenerClientes() {
    fetch('https://localhost:7103/api/Clientes')
        .then(response => response.json())
        .then(data => mostrarClientes(data))
        .catch(error => console.error('Error al obtener clientes:', error));
}

// Función para mostrar clientes en el front-end
function mostrarClientes(clientes) {
    const listaClientes = document.getElementById('clientes-lista');
    listaClientes.innerHTML = '';

    clientes.forEach(cliente => {
        const itemCliente = document.createElement('div');
        itemCliente.classList.add('cliente-item');
        itemCliente.innerHTML = `
            <h3>${cliente.name}</h3>
            <p><strong>Email:</strong> ${cliente.email}</p>
            <p><strong>Dirección:</strong> ${cliente.direction}</p>
            <button onclick="eliminarCliente(${cliente.id})">Eliminar Cliente</button>
        `;
        listaClientes.appendChild(itemCliente);
    });
}

// Función para agregar un nuevo cliente
function agregarCliente(nombre, email, direccion) {
    const nuevoCliente = {
        name: nombre,
        email: email,
        direction: direccion
    };

    fetch('https://localhost:7103/api/Clientes', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(nuevoCliente)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Cliente agregado:', data);
        obtenerClientes(); // Actualizar la lista de clientes después de agregar uno nuevo
    })
    .catch(error => console.error('Error al agregar cliente:', error));
}

// Función para eliminar un cliente por ID
function eliminarCliente(idCliente) {
    fetch(`https://localhost:7103/api/Clientes/${idCliente}`, {
        method: 'DELETE'
    })
    .then(response => {
        if (response.ok) {
            console.log(`Cliente con ID ${idCliente} eliminado.`);
            obtenerClientes(); // Actualizar la lista de clientes después de eliminar uno
        } else {
            console.error(`Error al eliminar cliente con ID ${idCliente}.`);
        }
    })
    .catch(error => console.error('Error al eliminar cliente:', error));
}

// Función para obtener y mostrar productos
function obtenerProductos() {
    fetch('https://localhost:7103/api/Productos')
        .then(response => response.json())
        .then(data => mostrarProductos(data))
        .catch(error => console.error('Error al obtener productos:', error));
}

// Función para mostrar productos en el front-end
function mostrarProductos(productos) {
    const listaProductos = document.getElementById('productos-lista');
    listaProductos.innerHTML = '';

    productos.forEach(producto => {
        const itemProducto = document.createElement('div');
        itemProducto.classList.add('producto-item');
        itemProducto.innerHTML = `
            <h3>${producto.name}</h3>
            <p><strong>Precio:</strong> $${producto.price}</p>
            <p><strong>Stock:</strong> ${producto.stock}</p>
            <button onclick="eliminarProducto(${producto.id})">Eliminar Producto</button>
        `;
        listaProductos.appendChild(itemProducto);
    });
}

// Función para agregar un nuevo producto
function agregarProducto(nombre, precio, stock) {
    const nuevoProducto = {
        name: nombre,
        price: parseFloat(precio),
        stock: parseInt(stock)
    };

    fetch('https://localhost:7103/api/Productos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(nuevoProducto)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Producto agregado:', data);
        obtenerProductos(); // Actualizar la lista de productos después de agregar uno nuevo
    })
    .catch(error => console.error('Error al agregar producto:', error));
}

// Función para eliminar un producto por ID
function eliminarProducto(idProducto) {
    fetch(`https://localhost:7103/api/Productos/${idProducto}`, {
        method: 'DELETE'
    })
    .then(response => {
        if (response.ok) {
            console.log(`Producto con ID ${idProducto} eliminado.`);
            obtenerProductos(); // Actualizar la lista de productos después de eliminar uno
        } else {
            console.error(`Error al eliminar producto con ID ${idProducto}.`);
        }
    })
    .catch(error => console.error('Error al eliminar producto:', error));
}

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

