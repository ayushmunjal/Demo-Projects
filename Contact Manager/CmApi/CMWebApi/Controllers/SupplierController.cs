using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using CMWebApi.Models;
using CMWebApi.Repository;

namespace CMWebApi.Controllers
{
    [Route("api/[controller]")]
    public class SupplierController : Controller
    {
        private ICMRepository _dal;
        public SupplierController(ICMRepository dal) => _dal = dal;

        // GET api/supplier/all
        [HttpGet("all")]
        public ActionResult Get() => Ok(_dal.GetSupplier());

        // GET api/supplier/2
        [HttpGet("{id}")]
        public ActionResult Get(long id) => Ok(_dal.GetSupplier(id));

        // POST api/supplier/add
        [HttpPost("add")]
        public ActionResult Post([FromBody]Supplier supplier)
        {
            try
            {
                // Validations for Supplier
                if (supplier != null && ValidName(supplier.Name) && ValidTelephone(supplier.Telephone))
                {
                    //Check if contact exists
                    if (_dal.CheckPerson(supplier.Name))
                        return BadRequest("Contact Already Exists!");

                    // Add Supplier
                    var supp = _dal.AddSupplier(supplier);
                    return Ok(supp); // Return Supplier object with Ok Status
                }
                //Returns Message and status as per validations
                else if (!ValidName(supplier.Name))
                    return BadRequest("Invalid Name! Maximum 50 characters!");
                else if (!ValidTelephone(supplier.Telephone))
                    return BadRequest("Invalid Number! Maximum 12, Minimum 7 digits!");

                return BadRequest("Invalid Entry! Please try again!");
            }
            catch (Exception ex)
            {
                return BadRequest("Invalid Entry! Please try again! Message from server: "+ex.Message);
            }
        }

        // PUT api/supplier/update
        [HttpPut("update")]
        public ActionResult Put([FromBody]Supplier supplier)
        {
            try
            {
                // Validations for Supplier
                if (supplier != null && ValidName(supplier.Name) && ValidTelephone(supplier.Telephone))
                {
                    var supp = _dal.UpdateSupplier(supplier);
                    return Ok(supp); // Return Supplier object with Ok Status
                }
                //Return Message and status as per validations
                else if (!ValidName(supplier.Name))
                    return BadRequest("Invalid Name! Maximum 50 characters!");
                else if (!ValidTelephone(supplier.Telephone))
                    return BadRequest("Invalid Number! Maximum 12, Minimum 7 digits!");
                return BadRequest("Invalid Entry! Please try again!");
            }
            catch (Exception)
            {
                return BadRequest("Some error occurred! Please try again!");
            }
        }

        // DELETE api/supplier/5
        [HttpDelete("{id}")]
        public ActionResult Delete(long id)
        {
            try
            {
                _dal.DeleteSupplier(id);
                return Ok("Deleted Successfully!");
            }
            catch (Exception)
            {
                return BadRequest("Some error occurred! Please try again!");
            }
        }

        //Validates Telephone number with Minimum 7 and Maximum 12 digits
        private bool ValidTelephone(long number)
        {
            if (number==0 || number.ToString().Length<7 || number.ToString().Length>12)
                return false;
            return true;
        }

        //Validates Name object with both first and last name property to have maximum 50 characters
        private bool ValidName(Name name)
        {
            if (name == null || name.First == null || name.Last == null ||
                name.First.Length > 50 || name.Last.Length > 50)
                return false;
            else
                return true;
        }

    }
}
