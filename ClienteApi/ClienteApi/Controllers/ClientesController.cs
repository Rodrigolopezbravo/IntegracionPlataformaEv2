using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using ClienteApi.Models;

namespace ClienteApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ClientesController : ControllerBase
    {
        private static IList<Cliente> clientes = new List<Cliente>
        {
            new Cliente { Id = 1, Name = "Rodrigo Lopez", Email = "rodrigolopez@duocuc.cl", Direction = "Duoc 1"},
            new Cliente { Id = 2, Name = "Nicolas Chavez", Email = "nicolaschavez@duocuc.cl", Direction = "Duoc 2" },
            new Cliente { Id = 3, Name = "Felipe Millan", Email = "felipemillan@duocuc.cl", Direction = "Duoc 3" }
        };

        [HttpGet]
        public ActionResult<IEnumerable<Cliente>> GetClientes()
        {
            return Ok(clientes);
        }

        [HttpGet("{id}")]
        public ActionResult<Cliente> GetCliente(int id)
        {
            var cliente = clientes.FirstOrDefault(c => c.Id == id);
            if (cliente == null)
            {
                return NotFound();
            }
            return Ok(cliente);
        }

        [HttpPost]
        public ActionResult<Cliente> CrearCliente([FromBody] Cliente cliente)
        {
            if (cliente == null)
            {
                return BadRequest("Cliente nulo");
            }
            cliente.Id = clientes.Max(c => c.Id) + 1;
            clientes.Add(cliente);
            return CreatedAtAction(nameof(GetCliente), new { id = cliente.Id }, cliente);
        }

        [HttpPut("{id}")]
        public ActionResult UpdateCliente(int id, [FromBody] Cliente cliente)
        {
            if (cliente == null)
            {
                return BadRequest("Cliente nulo");
            }

            var existeCliente = clientes.FirstOrDefault(c => c.Id == id);
            if (existeCliente == null)
            {
                return NotFound();
            }
            existeCliente.Name = cliente.Name;
            existeCliente.Email = cliente.Email;
            return NoContent();
        }

        [HttpDelete("{id}")]
        public ActionResult DeleteCliente(int id)
        {
            var cliente = clientes.FirstOrDefault(c => c.Id == id);
            if (cliente == null)
            {
                return NotFound();
            }
            clientes.Remove(cliente);
            return NoContent();
        }
    }


}
