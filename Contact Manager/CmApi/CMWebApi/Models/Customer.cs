using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CMWebApi.Models
{
    public class Customer : Person
    {
		public DateTime? Birthday { get; set; }

        [Required, EmailAddress]
        public string Email { get; set; }
    }
}