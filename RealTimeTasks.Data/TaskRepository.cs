using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RealTimeTasks.Data
{
    public class TaskRepository
    {
        private readonly string _connectionString;

        public TaskRepository(string connectionString)
        {
            _connectionString = connectionString;
        }

        public List<TaskItem> GetAll()
        {
            using var context = new TaskDataContext(_connectionString);
            return context.Tasks.Include(t => t.User).ToList();
        }

        public void Add(TaskItem task)
        {
            using var context = new TaskDataContext(_connectionString);
            context.Tasks.Add(task);
            context.SaveChanges();
        }

        public bool CanClaim(int taskId)
        {
            using var context = new TaskDataContext(_connectionString);
            return context.Tasks.Any(t => t.Id == taskId && t.UserId == null);
        }

        public void Claim(int userId, int taskId)
        {
            using var context = new TaskDataContext(_connectionString);
            context.Tasks.Where(t => t.Id == taskId).ExecuteUpdate(t => t.SetProperty(t => t.UserId, _ => userId));
            //var task = context.Tasks.FirstOrDefault(t => t.Id == taskId);
            //if (task == null)
            //{
            //    return;
            //}
            //task.UserId = userId;
            //context.SaveChanges();
        }

        public bool CanDelete(int userId, int taskId)
        {
            using var context = new TaskDataContext(_connectionString);
            return context.Tasks.Any(t => t.Id == taskId && t.UserId == userId);
        }

        public void Delete(int taskId)
        {
            using var context = new TaskDataContext(_connectionString);
            context.Database.ExecuteSqlInterpolated($"DELETE FROM Tasks WHERE Id = {taskId}");
        }
    }
}
