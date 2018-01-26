using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using CMApi.Models;

namespace CMApi.Controllers
{
    [Route("api/[controller]")]
    public class CustomerController : Controller
    {
        private readonly CMDBContext _context ;  
        public CustomerController(CMDBContext context)
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
        public string Post(Customer customer)
        {
            if (customer.name.first!=null && customer.name.last!=null && customer.email!=null)
            {
                _context.Persons.Add(customer);
                _context.Customers.Add(customer);
                _context.SaveChanges();
                return "Customer Added Successfully!";
            }
            else
            {
                return "Invalid Entry! Please try again!";
            }
            
        }

        
    }
}
