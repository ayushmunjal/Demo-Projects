using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using TestApi.Models;

namespace TestApi.Controllers
{
    [Route("api/[controller]")]
    public class ValuesController : Controller
    {
        private readonly ActivityContext _context ;  
        public ValuesController(ActivityContext context)
        {
            _context = context;

            if (_context.Activities.Count() == 0)
            {
                _context.Activities.Add(new Activity { id=1, name="Sports Game",date = DateTime.Now.AddDays(2)});
                _context.Activities.Add(new Activity { id=2, name="Karaoke Night",date = DateTime.Now.AddDays(1)});
                _context.Activities.Add(new Activity { id=3, name="Board Game",date= DateTime.Now.AddDays(4)});
                _context.Activities.Add(new Activity { id=4, name="Scavenger Hunt",date = DateTime.Now.AddDays(3)});
                _context.Activities.Add(new Activity { id=5, name="Cooking Class",date = DateTime.Now.AddDays(0)});
                _context.Activities.Add(new Activity { id=6, name="Painting Class",date = DateTime.Now.AddDays(2)});
                _context.Activities.Add(new Activity { id=7, name="Explore a New Place",date = DateTime.Now.AddDays(5)});
                _context.SaveChanges();
            }
        }


        [HttpGet("activities")]
        public IEnumerable<Activity> Get()
        {
            return _context.Activities.ToList();
        }

        [HttpGet("persons")]
        public IEnumerable<Person> Get(int id)
        {
            return _context.Persons.ToList();
        }

        [HttpPost("add")]
        public string Post(Person person)
        {
            if (person.firstName!=null && person.lastName!=null 
            && person.email!=null && person.activityId!=0 && person.comments!=null)
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
