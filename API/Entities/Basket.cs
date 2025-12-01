namespace API.Entities
{
    public class Basket
    {
        public int Id { get; set; }
        public string BuyerId { get; set; }
        public List<BasketItem> Items { get; set; } = [];

        public void AddItem(int productId, int quantity)
        {
            var item = Items.FirstOrDefault(p => p.ProductId == productId);
            if (item == null)
                Items.Add(new BasketItem() { ProductId = productId, Quantity = quantity });
            else
                item.Quantity += quantity;
        }

        public void RemoveItem(int productId, int quantity)
        {
            var item = Items.FirstOrDefault(p => p.ProductId == productId);
            if (item != null)
            {
                if (item.Quantity == 0)
                    Items.Remove(item);
                else item.Quantity -= quantity;
            }
        }
    }
}
