using API.Data;
using API.Entities;
using API.Middleware;
using API.RequestHelper;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddDbContext<ApiDbContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection")));
builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

builder.Services.AddScoped<ITokenHelper, TokenHelper>();
// Add services to the container.
builder.Services.AddCors(options =>
{
    options.AddPolicy("CorsPolicy", policy =>
    {
        policy.AllowAnyHeader()
              .AllowAnyMethod()
              .AllowCredentials()
              .WithOrigins("http://localhost:3000");
    });
});
builder.Services.AddControllers();

builder.Services.AddIdentityCore<User>()
    .AddRoles<Role>()
    .AddEntityFrameworkStores<ApiDbContext>();

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(opt =>
    {
        opt.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = false,
            ValidateAudience = false,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(builder.Configuration["jwt"]))
        };
    });

builder.Services.AddAuthorization();


var app = builder.Build();
app.UseMiddleware<ExceptionMiddleware>();

app.UseCors("CorsPolicy");

app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

await InitializeDataBase();

await app.RunAsync();

async Task InitializeDataBase()
{
    using var scope = app.Services.CreateScope();
    var context = scope.ServiceProvider.GetRequiredService<ApiDbContext>();
    var userManager = scope.ServiceProvider.GetRequiredService<UserManager<User>>();
    try
    {
        await context.Database.MigrateAsync();
        await DbInitializer.Initialize(context, userManager);

    }
    catch (Exception ex)
    {
        Console.WriteLine(ex.Message);
    }


}