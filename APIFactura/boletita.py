from flask import Flask, request, jsonify
from flask_restful import Resource, Api
from flask_cors import CORS 
import requests 

app = Flask(__name__)
api = Api(app)
cors_boletas = CORS(app, resources={r"/api/*": {"origins": "*"}})

# Lista para almacenar boletas
boletas = []

class BoletaResource(Resource):
    def post(self):
        # Obtener el cuerpo de la solicitud
        datos_boleta = request.get_json()

        # Obtener información del cliente
        response_cliente = requests.get(f"http://localhost:27776/api/cliente/{datos_boleta['cliente_id']}")
        cliente = response_cliente.json()

        productos = []
        total = 0

        # Obtener información de los productos
        for item in datos_boleta['productos']:
            response_producto = requests.get(f"http://localhost:27776/api/producto/{item['id']}")
            producto = response_producto.json()
            producto['cantidad'] = int(item['cantidad'])
            total += producto['precio'] * producto['cantidad']
            productos.append(producto)

        # Crear la boleta
        nueva_boleta = {
            'documento': datos_boleta['documento'],
            'tipo_envio': datos_boleta['tipo_envio'],
            'cliente': cliente,
            'productos': productos,
            'total': total,
            'id': str(len(boletas) + 1).zfill(6)
        }

        # Agregar la boleta a la lista
        boletas.append(nueva_boleta)

        # Devolver la boleta creada
        return jsonify(nueva_boleta)
    
    def get(self, boleta_id):
        # Buscar la boleta por id
        boleta = next((boleta for boleta in boletas if boleta['id'] == boleta_id), None)
        return jsonify(boleta)

# Añadir el recurso a la API
api.add_resource(BoletaResource, '/api/boletas')

if __name__ == '__main__':
    # Ejecutar la aplicación Flask
    app.run(debug=True)
