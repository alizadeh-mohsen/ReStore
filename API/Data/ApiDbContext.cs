using API.Entities;
using API.Entities.OrderAggregate;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

public class ApiDbContext : IdentityDbContext<User, Role, int>
{
    public ApiDbContext(DbContextOptions<ApiDbContext> options)
        : base(options)
    {
    }

    public DbSet<Product> Products { get; set; } = default!;
    public DbSet<Basket> Baskets { get; set; } = default!;
    public DbSet<Order> Orders { get; set; } = default!;


    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);

        builder.Entity<User>()
            .HasOne(a => a.Address)
            .WithOne()
            .HasForeignKey<UserAddress>(a => a.Id)
            .OnDelete(DeleteBehavior.Cascade);

        builder.Entity<Role>().HasData(
            new Role { Id = 1, Name = "Member", NormalizedName = "MEMBER" },
            new Role { Id = 2, Name = "Admin", NormalizedName = "ADMIN" }
            );
    }
}
