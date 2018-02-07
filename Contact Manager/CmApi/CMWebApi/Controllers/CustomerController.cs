using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using CMWebApi.Models;
using System.Text.RegularExpressions;
using CMWebApi.Repository;

namespace CMWebApi.Controllers
{
    [Route("api/[controller]")]
    public class CustomerController : Controller
    {
        private ICMRepository _dal;

        public CustomerController(ICMRepository dal) => _dal = dal;

        // GET api/customer/all
        [HttpGet("all")]
        public ActionResult Get() => Ok(_dal.GetCustomer());

        // GET api/customer/1
        [HttpGet("{id}")]
        public ActionResult Get(long id) => Ok(_dal.GetCustomer(id));

        // POST api/customer/add
        [HttpPost("add")]
        public ActionResult Post([FromBody]Customer customer)
        {
            try
            {
                // Validations for Customer
                if (customer != null && ValidName(customer.Name) && ValidEmail(customer.Email))
                {
                    //Check if contact exists
                    if (_dal.CheckPerson(customer.Name))
                        return BadRequest("Contact Already Exists!");

                    // Add Customer
                    var cust = _dal.AddCustomer(customer);
                    return Ok(cust);
                }
                //Returns Message and status as per validations
                else if (!ValidName(customer.Name))
                    return BadRequest("Invalid Name! Maximum 50 characters!");
                return BadRequest("Invalid Entry! Please try again!");
            }
            catch (Exception)
            {
                return BadRequest("Some error occured! Please try again!");
            }
        }

        // PUT api/customer/update
        [HttpPut("update")]
        public ActionResult Put([FromBody]Customer customer)
        {
            try
            { 
                if (customer != null && ValidName(customer.Name) && ValidEmail(customer.Email))
                {
                    var cust = _dal.UpdateCustomer(customer);
                    return Ok(cust);
                }
                //Returns Message and status as per validations
                else if (!ValidName(customer.Name))
                    return BadRequest("Invalid Name! Maximum 50 characters!");
                else if (!ValidEmail(customer.Email))
                    return BadRequest("Invalid Email! Please check!");
                return BadRequest("Invalid Entry! Please try again!");
            }
            catch (Exception)
            {
                return BadRequest("Some error occured! Please try again!");
            }
        }

        // DELETE api/customer/5
        [HttpDelete("{id}")]
        public ActionResult Delete(long id)
        {
            try
            {
                _dal.DeleteCustomer(id);
                return Ok("Deleted Successfully!");
            }
            catch (Exception)
            {
                return BadRequest("Some error occurred! Please try again!");
            }
        }

        private bool ValidEmail(string email)
        {
            if (string.IsNullOrEmpty(email) || string.IsNullOrWhiteSpace(email))
                return false;
            else
            {
                Regex regex = new Regex(@"^[\w-\.]+@([\w-]+\.)+[\w-]{2,6}$");
                Match match = regex.Match(email);
                if (match.Success)
                    return true;
                else
                    return false;
            }
        }
        
        //Validates Name with both first and last name to have maximum 50 characters
        private bool ValidName(Name name)
        {
            if (name==null || name.First==null || name.Last == null ||
                name.First.Length>50 || name.Last.Length>50)
                return false;
            else
                return true;
        }

    }
}
