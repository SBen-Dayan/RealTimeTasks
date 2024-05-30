using Microsoft.AspNetCore.Http.HttpResults;

namespace RealTimeTasks.Web.Models
{
    public class SignupModel
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
    }
}
