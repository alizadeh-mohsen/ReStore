namespace API.RequestHelper
{
    public class QueryParams : PaginationParams
    {
        public string? SearchTerm { get; set; }
        public string? OrderBy { get; set; }
        public string? Types { get; set; }
        public string? Brands { get; set; }
    }
}
