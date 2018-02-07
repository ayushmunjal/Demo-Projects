using CMWebApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CMWebApi.Repository
{
    public interface ICMRepository
    {
        IEnumerable<Customer> GetCustomer();

        Customer GetCustomer(long id);

        IEnumerable<Supplier> GetSupplier();

        Supplier GetSupplier(long id);

        Customer AddCustomer(Customer customer);

        Supplier AddSupplier(Supplier supplier);

        Customer UpdateCustomer(Customer customer);

        Supplier UpdateSupplier(Supplier supplier);

        void DeleteCustomer(long id);

        void DeleteSupplier(long id);

        Boolean CheckPerson(Name name);

    }
}
