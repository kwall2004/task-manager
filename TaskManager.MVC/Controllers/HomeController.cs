using Microsoft.AspNet.Identity;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using TaskManager.MVC.Models;

namespace TaskManager.MVC.Controllers
{
    [Authorize]
    public class HomeController : Controller
    {
        private ApplicationDbContext db = new ApplicationDbContext();

        public ActionResult Index()
        {
            var userId = User.Identity.GetUserId();

            var model = new TasksViewModel();

            model.Tasks = db.TaskModels.ToList().Where(t => t.User.Id == userId).Select(t => new TaskModel
            {
                Id = t.Id,
                Description = t.Description,
                IsCompleted = t.IsCompleted
            }).ToList();

            model.ActiveCount = model.Tasks.Where(t => !t.IsCompleted).Count();

            return View(model);
        }

        [HttpPost]
        public PartialViewResult AddTask(TaskViewModel model)
        {
            var userId = User.Identity.GetUserId();

            var taskModel = new TaskModel
            {
                Description = model.Description,
                User = db.Users.Find(userId)
            };

            db.TaskModels.Add(taskModel);

            db.SaveChanges();

            model.Id = taskModel.Id;

            return PartialView("_Task", model);
        }

        [HttpPost]
        public void SaveTaskIsCompleted(TaskViewModel model)
        {
            var taskModel = db.TaskModels.Find(model.Id);
            taskModel.IsCompleted = model.IsCompleted;

            db.Entry(taskModel).State = EntityState.Modified;

            db.SaveChangesAsync();
        }

        [HttpPost]
        public void DeleteTask(TaskViewModel model)
        {
            var taskModel = db.TaskModels.Find(model.Id);

            db.TaskModels.Remove(taskModel);

            db.SaveChangesAsync();
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }
    }
}