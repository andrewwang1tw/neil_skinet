using Core.Entities;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Data
{
    public class StoreContext : DbContext
    {
        public StoreContext(DbContextOptions<StoreContext> options) : base (options)
        {
        }

        //
        // https://iter01.com/681172.html
        //
        public DbSet<Product> Products {get; set;} = default!;
    }
}