using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using CMApi.Models;

namespace CMApi.Controllers
{
    [Route("api/[controller]")]
    public class ValuesController : Controller
    {
        private readonly CMDBContext _context ;  
        public ValuesController(CMDBContext context)
        {
            _context = context;

        }

        [HttpGet("customer")]
        public IEnumerable<Customer> GetCustomer()
        {
            return _context.Customers.ToList();
        }

        [HttpGet("supplier")]
        public IEnumerable<Customer> GetSupplier()
        {
            return _context.Customers.ToList();
        }

        [HttpGet("person")]
        public IEnumerable<Person> GetPerson()
        {
            return _context.Persons.ToList();
        }

        [HttpGet("customer")]
        public IEnumerable<Customer> GetCustomer(int id)
        {
            return _context.Customers.ToList();
        }

        [HttpGet("supplier")]
        public IEnumerable<Customer> GetSupplier(int id)
        {
            return _context.Customers.ToList();
        }

        [HttpGet("person")]
        public IEnumerable<Person> GetPerson(int id)
        {
            return _context.Persons.ToList();
        }


        [HttpPost("add")]
        public string Post(Person person)
        {
            if (person.name.first!=null && person.name.last!=null)
            {
                _context.Persons.Add(person);
                _context.SaveChanges();
                return "Added Successfully!";
            }
            else
            {
                return "Invalid Entry!";
            }
            
        }

        
    }
}
