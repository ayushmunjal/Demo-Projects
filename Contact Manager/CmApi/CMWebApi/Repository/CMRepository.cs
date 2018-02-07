using CMWebApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CMWebApi.Repository
{
    public class CMRepository : ICMRepository
    {
        private CMDBContext _context;

        public CMRepository(CMDBContext context)
        {
            _context = context;
            context.Database.EnsureCreated();
        }

        public IEnumerable<Customer> GetCustomer()
        {
            return _context.Customers.ToList();
        }

        public Customer GetCustomer(long id)
        {
            return _context.Customers.Where(a=>a.Id==id).FirstOrDefault<Customer>();
        }

        public IEnumerable<Supplier> GetSupplier()
        {
            return _context.Suppliers.ToList();
        }

        public Supplier GetSupplier(long id)
        {
            return _context.Suppliers.Where(a => a.Id == id).FirstOrDefault<Supplier>();
        }

        public Customer AddCustomer(Customer customer)
        {
            try
            {
                var dbCust = _context.Customers.Add(customer).Entity;
                _context.SaveChanges();
                return dbCust;
            }
            catch (Exception)
            {
                throw;
            }
        }

        public Supplier AddSupplier(Supplier supplier)
        {
            try
            {
                var dbSupp = _context.Suppliers.Add(supplier).Entity;
                _context.SaveChanges();
                return dbSupp;
            }
            catch (Exception)
            {
                throw;
            }
        }

        public Customer UpdateCustomer(Customer customer)
        {
            try
            {
                var dbCust = _context.Customers.Update(customer).Entity;
                _context.SaveChanges();
                return dbCust;
            }
            catch (Exception)
            {
                throw;
            }
        }

        public Supplier UpdateSupplier(Supplier supplier)
        {
            try
            {
                var dbSupp = _context.Suppliers.Update(supplier).Entity;
                _context.SaveChanges();
                return dbSupp;
            }
            catch (Exception)
            {
                throw;
            }
        }

        public void DeleteCustomer(long id)
        {
            try
            {
                _context.Customers.Remove(_context.Customers.Where(a => a.Id == id).FirstOrDefault<Customer>());
                _context.SaveChanges();
            }
            catch (Exception)
            {
                throw;
            }
        }

        public void DeleteSupplier(long id)
        {
            try
            {
                _context.Suppliers.Remove(_context.Suppliers.Where(a => a.Id == id).FirstOrDefault<Supplier>());
                _context.SaveChanges();
            }
            catch (Exception)
            {
                throw;
            }
        }

        public Boolean CheckPerson(Name name)
        {
            return _context.Persons.Any(a => a.Name.First == name.First && a.Name.Last == name.Last);
            //if(!_context.Customers.Any(a => a.Name.First == name.First && a.Name.Last == name.Last))
            //    return _context.Suppliers.Any(a => a.Name == name);
            //return true;
        }

    }
}
