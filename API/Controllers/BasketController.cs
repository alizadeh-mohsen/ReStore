using API.DTOs;
using API.Entities;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BasketController : ControllerBase
    {
        private readonly ApiDbContext _context;
        private readonly IMapper _mapper;

        public BasketController(ApiDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        [HttpGet(Name = "GetBasket")]
        public async Task<ActionResult<BasketDto>> GetBasket()
        {
            var basket = _context.Baskets
                .Include(b => b.Items)
                .ThenInclude(b => b.Product)
                .FirstOrDefaultAsync(p => p.BuyerId == Request.Cookies["buyerId"]);
            return basket == null ? NotFound() : Ok(_mapper.Map<BasketDto>(basket));
        }


        [HttpPost]
        public async Task<ActionResult<BasketDto>> AddItemToBasket(int productId, int quantity)
        {
            var buyerId = Request.Cookies["buyerId"];
            var basket = await _context.Baskets.Include(p => p.Items).ThenInclude(p => p.Product)
              .FirstOrDefaultAsync(b => b.BuyerId == buyerId);
            if (string.IsNullOrEmpty(buyerId) || basket == null)
            {
                buyerId = string.IsNullOrEmpty(buyerId) ? Guid.NewGuid().ToString() : buyerId;
                Response.Cookies.Append("buyerId", buyerId, new CookieOptions
                {
                    Expires = DateTime.Now.AddDays(7),
                    IsEssential = true
                });

                var newBasket = new Basket
                {
                    BuyerId = buyerId,
                    Items = new List<BasketItem> { new BasketItem
                     {
                         ProductId = productId,
                         Quantity = quantity
                     }
                 }
                };

                _context.Baskets.Add(newBasket);
            }
            else
            {
                basket.AddItem(productId, quantity);
            }

            await _context.SaveChangesAsync();

            return CreatedAtAction("GetBasket", _mapper.Map<BasketDto>(basket));

        }


        [HttpDelete]
        public async Task<IActionResult> RemoveItem(int productId, int quantity)
        {
            var basket = await _context.Baskets.Include(p => p.Items).ThenInclude(p => p.Product)
                .FirstOrDefaultAsync(b => b.BuyerId == Request.Cookies["buyerId"]);
            var product = await _context.Products.FindAsync(productId);
            basket.RemoveItem(productId, quantity);
            _context.SaveChanges(true);
            return Ok();

        }




    }
}
