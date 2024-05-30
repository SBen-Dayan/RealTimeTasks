using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using RealTimeTasks.Data;
using RealTimeTasks.Web.Models;
using System.Security.Claims;

namespace RealTimeTasks.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly string _conStr;

        public AccountController(IConfiguration configuration)
        {
            _conStr = configuration.GetConnectionString("ConStr");
        }

        [HttpPost("signup")]
        public User Signup(SignupModel signupUser)
        {
            new UserRepository(_conStr).Add(new User
            {
                FirstName = signupUser.FirstName,
                LastName = signupUser.LastName,
                Email = signupUser.Email
            }, signupUser.Password);

            return Login(signupUser.Email, signupUser.Password);
        }

        [HttpPost("login")]
        public User Login(LoginModel loginModel)
        {
            return Login(loginModel.Email, loginModel.Password);
        }

        private User Login(string email, string password)
        {
            var user = new UserRepository(_conStr).Login(email, password);
            if (user == null)
            {
                return null;
            }

            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.Email, email)
            };

            HttpContext.SignInAsync(new ClaimsPrincipal(
                new ClaimsIdentity(claims, "Cookies", ClaimTypes.Email, "role"))).Wait();

            return user;
        }

        [HttpGet]
        [Route("getCurrentUser")]
        public User GetCurrentUser()
        {
            return User.Identity.IsAuthenticated ?
                new UserRepository(_conStr).GetByEmail(User.Identity.Name) : null;
        }


        [HttpPost]
        [Route("logout")]
        public void Logout()
        {
            HttpContext.SignOutAsync().Wait();
        }
    }
}
