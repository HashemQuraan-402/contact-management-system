using Contactly.Models.Domain;
using Microsoft.EntityFrameworkCore;

namespace Contactly.Data
{
    public class ContactDbContext : DbContext
    {
        public ContactDbContext(DbContextOptions<ContactDbContext> options) : base(options) { }

        public DbSet<Contact> Contacts { get; set; }

    }
}
