using System.Reflection;
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
        public DbSet<ProductBrand> ProductBrand {get; set;} = default!;
        public DbSet<ProductType> ProductType {get; set;} = default!;

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
        }
    }
}