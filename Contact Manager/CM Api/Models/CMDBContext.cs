using Microsoft.EntityFrameworkCore;

namespace CMApi.Models
{
    public class CMDBContext : DbContext
    {
        public CMDBContext(DbContextOptions<CMDBContext> options) : base(options)
        {
            
        }

        public DbSet<Person> Persons {get; set;}
        public DbSet<Supplier> Suppliers {get; set;}
        public DbSet<Customer> Customers {get; set;}

    }
}