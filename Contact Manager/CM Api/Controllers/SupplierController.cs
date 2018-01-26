using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using CMApi.Models;

namespace CMApi.Controllers
{
    [Route("api/[controller]")]
    public class SupplierController : Controller
    {
        private readonly CMDBContext _context ;  
        public SupplierController(CMDBContext context)
        {
            _context = context;

        }

        [HttpGet("All")]
        public IEnumerable<Customer> Get()
        {
            return _context.Customers.ToList();
        }

        [HttpGet("{id}")]
        public IEnumerable<Customer> Get(int id)
        {
            return _context.Customers.ToList();
        }

        [HttpPost("add")]
        public string Post(Supplier supplier)
        {
            if (supplier.name.first!=null && supplier.name.last!=null 
            && supplier.telephone > 999999 && supplier.telephone < 1000000000000 )
            {
                _context.Persons.Add(supplier);
                _context.Suppliers.Add(supplier);
                _context.SaveChanges();
                return "Supplier Added Successfully!";
            }
            else
            {
                return "Invalid Entry! Please try again!";
            }
            
        }

        
    }
}
