using API.Entities;

namespace API.RequestHelper
{
    public interface ITokenHelper
    {
        Task<string> GenerateToken(User user);
    }
}