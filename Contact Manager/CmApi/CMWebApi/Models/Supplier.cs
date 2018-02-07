using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CMWebApi.Models
{
    public class Supplier : Person
    {
        [Required]
        public long Telephone { get; set; }

    }
}