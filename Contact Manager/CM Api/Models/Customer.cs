using System;

namespace CMApi.Models
{
    public class Customer : Person
    {
		public DateTime birthday { get; set; }
        public string email { get; set; }
    }
}