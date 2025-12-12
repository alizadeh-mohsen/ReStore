using API.DTOs;
using API.Entities;
using API.RequestHelper;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<User> _userManager;
        private readonly IMapper _mapper;
        private readonly ITokenHelper _tokenHelper;

        public AccountController(UserManager<User> userManager, IMapper mapper,
            ITokenHelper tokenHelper)
        {
            _userManager = userManager;
            _mapper = mapper;
            _tokenHelper = tokenHelper;
        }

        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
        {

            var user = await _userManager.FindByNameAsync(loginDto.Username);

            if (user == null)
            {
                return BadRequest("User not found");
            }
            if (!await _userManager.CheckPasswordAsync(user, loginDto.Password))
            {
                return Unauthorized("Incorrect password");
            }
            var token = await _tokenHelper.GenerateToken(user);

            var userDto = new UserDto
            {
                Email = user.Email,
                Token = token
            };

            return Ok(userDto);
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(RegisterDto registerDto)
        {
            try
            {
                var user = new User
                {
                    UserName = registerDto.Username,
                    Email = registerDto.Username + "@test.com",
                    EmailConfirmed = true
                };

                var result = await _userManager.CreateAsync(user, registerDto.Password);
                if (!result.Succeeded)
                {
                    foreach (var error in result.Errors)
                    {
                        ModelState.AddModelError(error.Code, error.Description);
                    }
                    return ValidationProblem();
                }

                await _userManager.AddToRoleAsync(user, "Member");

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

            return Created();
        }
        [Authorize]
        [HttpGet("currentUser")]
        public async Task<ActionResult<UserDto>> GetCurrentUser()
        {
            var user = await _userManager.FindByNameAsync(User.Identity.Name);
            var userDto = new UserDto
            {
                Email = user.Email,
                Token = await _tokenHelper.GenerateToken(user)
            };
            return userDto;
        }

    }
}