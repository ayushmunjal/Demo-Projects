using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace CMWebApi.Models
{
    public class CMDBContext : DbContext
    {
        public DbSet<Supplier> Suppliers { get; set; }

        public DbSet<Customer> Customers { get; set; }

        public DbSet<Person> Persons { get; set; }

        public CMDBContext(DbContextOptions<CMDBContext> options)
            : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Person>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Id).ValueGeneratedOnAdd();
                entity.OwnsOne(n=>n.Name).Property(a=>a.First).HasColumnType("varchar(50)").HasColumnName("First");
                entity.OwnsOne(e=>e.Name).Property(a=>a.Last).HasColumnType("varchar(50)").HasColumnName("Last");
                entity.HasDiscriminator<string>("person_type")
                .HasValue<Customer>("customer")
                .HasValue<Supplier>("supplier");
            });

            modelBuilder.Entity<Customer>(entity =>
            {
                entity.HasBaseType<Person>();
                entity.Property(e => e.Birthday).HasColumnType("Date");
                entity.Property(e => e.Email).IsRequired(true).HasColumnType("varchar(120)");
            });


            modelBuilder.Entity<Supplier>(entity =>
            {
                entity.HasBaseType<Person>();
                entity.Property(e => e.Telephone).IsRequired(true).HasMaxLength(12);
            });
        }

        
    }
}
