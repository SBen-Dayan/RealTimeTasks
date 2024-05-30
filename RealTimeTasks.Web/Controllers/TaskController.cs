using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using RealTimeTasks.Data;
using RealTimeTasks.Web.Models;

namespace RealTimeTasks.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class TaskController : ControllerBase
    {
        private readonly string _connectionString;
        private readonly IHubContext<TaskHub> _taskHub;

        public TaskController(IConfiguration configuration, IHubContext<TaskHub> hubContext)
        {
            _connectionString = configuration.GetConnectionString("ConStr");
            _taskHub = hubContext;
        }

        [HttpGet("getAll")]
        public List<TaskItem> GetAll() => new TaskRepository(_connectionString).GetAll();

        [HttpPost("add")]
        public void Add(TitleModel model)
        {
            var task = new TaskItem { Title = model.Title };
            new TaskRepository(_connectionString).Add(task);
            _taskHub.Clients.All.SendAsync("newTask", task);
        }

        [HttpPost("claim")]
        public void Claim(IdModel model)
        {
            var repo = new TaskRepository(_connectionString);
            if (!repo.CanClaim(model.Id))
            {
                return;
            }
            repo.Claim(GetCurrentUserId(), model.Id);
            SendToAll(repo.GetAll());
        }

        [HttpPost("deleteTask")]
        public void DeleteTask(IdModel model)
        {
            var repo = new TaskRepository(_connectionString);
            if (!repo.CanDelete(GetCurrentUserId(), model.Id))
            {
                return;
            }
            repo.Delete(model.Id);
            SendToAll(repo.GetAll());

        }

        private void SendToAll(List<TaskItem> taskItems) => _taskHub.Clients.All.SendAsync("taskUpdate", taskItems);

        private int GetCurrentUserId()
        {
            var id = new UserRepository(_connectionString).GetByEmail(User.Identity.Name).Id;
            Console.WriteLine($"{id}, {User.Identity.Name}");
            return id;
        }

    }
}
