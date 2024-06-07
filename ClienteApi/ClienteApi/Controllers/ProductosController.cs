using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;

namespace ProductoApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductosController : ControllerBase
    {
        private static IList<Producto> productos = new List<Producto>
        {
            new Producto { Id = 1, Name = "PC", Price = 1200000 },
            new Producto { Id = 2, Name = "Celular", Price = 500000 },
            new Producto { Id = 3, Name = "Notebook", Price = 800000 }

        };

        [HttpGet]
        public ActionResult<IEnumerable<Producto>> GetProductos()
        {
            return Ok(productos);
        }

        [HttpGet("{id}")]
        public ActionResult<Producto> GetProducto(int id)
        {
            var product = productos.FirstOrDefault(p => p.Id == id);
            if (product == null)
            {
                return NotFound();
            }
            return Ok(product);
        }

        [HttpPost]
        public ActionResult<Producto> CreateProducto([FromBody] Producto producto)
        {
            if (producto == null)
            {
                return BadRequest("Producto nulo.");
            }
            producto.Id = productos.Max(p => p.Id) + 1;
            productos.Add(producto);
            return CreatedAtAction(nameof(GetProducto), new { id = producto.Id }, producto);
        }

        [HttpPut("{id}")]
        public ActionResult UpdateProducto(int id, [FromBody] Producto producto)
        {
            if (producto == null)
            {
                return BadRequest("Producto nulo.");
            }

            var existeProducto = productos.FirstOrDefault(p => p.Id == id);
            if (existeProducto == null)
            {
                return NotFound();
            }
            existeProducto.Name = producto.Name;
            existeProducto.Price = producto.Price;
            return NoContent();
        }

        [HttpDelete("{id}")]
        public ActionResult DeleteProducto(int id)
        {
            var producto = productos.FirstOrDefault(p => p.Id == id);
            if (producto == null)
            {
                return NotFound();
            }
            productos.Remove(producto);
            return NoContent();
        }
    }

    public class Producto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public double Price { get; set; }
    }
}
