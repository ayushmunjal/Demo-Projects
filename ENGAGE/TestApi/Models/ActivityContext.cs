using Microsoft.EntityFrameworkCore;

namespace TestApi.Models
{
    public class ActivityContext : DbContext
    {
        public ActivityContext(DbContextOptions<ActivityContext> options) : base(options)
        {
            
        }

        // protected override void OnModelCreating(ModelBuilder modelBuilder){
        //     modelBuilder.Entity<Activity>()
        //     .HasKey(a=>a.activityCode)
        //     .HasName("PrimaryKey_ActivityCode");
        // }

        public DbSet<Person> Persons {get; set;}
        public DbSet<Activity> Activities {get; set;}

    }
}