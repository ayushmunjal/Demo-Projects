using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CMWebApi.Models;
using Microsoft.AspNetCore.Mvc;

namespace CMWebApi.Controllers
{
    [Route("api/[controller]")]
    public class ValuesController : Controller
    {
        // For Test
        // GET api/values
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }
        
    }
}
