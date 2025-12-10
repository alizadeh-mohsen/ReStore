using API.Entities;

namespace API.Extensions
{
    public static class ProductExtensions
    {

        public static IQueryable<Product> Search(this IQueryable<Product> query, string searTerm)
        {
            if (string.IsNullOrEmpty(searTerm)) return query;
            return query.Where(p => p.Name.ToLower().Contains(searTerm.ToLower()));
        }

        public static IQueryable<Product> Sort(this IQueryable<Product> query, string orderby)
        {
            if (string.IsNullOrEmpty(orderby)) return query.OrderBy(p => p.Name);
            //price_desc,price,
            query = orderby switch
            {
                "price" => query.OrderBy(p => p.Price),
                "price_desc" => query.OrderByDescending(p => p.Price),
                _ => query.OrderBy(p => p.Name),
            };
            return query;
        }


        public static IQueryable<Product> Filter(this IQueryable<Product> query, string typeFilters, string brandFilters)
        {
            if (!string.IsNullOrEmpty(typeFilters))
            {
                var types = new List<string>();

                types.AddRange(typeFilters.Split(",").ToList());
                query = query.Where(p => types.Contains(p.Type));
            }

            if (!string.IsNullOrEmpty(brandFilters))
            {
                var brands = new List<string>();

                brands.AddRange(brandFilters.Split(",").ToList());
                query = query.Where(p => brands.Contains(p.Brand));
            }

            return query;
        }
    }
}
