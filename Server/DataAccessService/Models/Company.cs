using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessService.Models
{
    public class Company
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        public string Bulstat { get; set; }
        public string Email { get; set; }
        public string Telephone { get; set; }
    }
}
