using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.Owin;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Http.Description;
using TaskManager.API.Models;

namespace TaskManager.API.Controllers
{
    [Authorize]
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class TasksController : ApiController
    {
        private ApplicationDbContext db = new ApplicationDbContext();

        // GET: api/Tasks
        public IEnumerable<TaskModel> GetTaskModels()
        {
            var userId = User.Identity.GetUserId();

            return db.TaskModels.ToList().Where(task => task.User.Id == userId);
        }

        // GET: api/Tasks/5
        [ResponseType(typeof(TaskModel))]
        public async Task<IHttpActionResult> GetTaskModel(int id)
        {
            TaskModel taskModel = await db.TaskModels.FindAsync(id);
            if (taskModel == null)
            {
                return NotFound();
            }

            return Ok(taskModel);
        }

        // PUT: api/Tasks/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutTaskModel(int id, TaskModel taskModel)
        {
            var userId = User.Identity.GetUserId();

            taskModel.User = db.Users.Find(userId);

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != taskModel.Id)
            {
                return BadRequest();
            }

            db.Entry(taskModel).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TaskModelExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/Tasks
        [ResponseType(typeof(TaskModel))]
        public async Task<IHttpActionResult> PostTaskModel(TaskModel taskModel)
        {
            var userId = User.Identity.GetUserId();

            taskModel.User = db.Users.Find(userId);

            db.TaskModels.Add(taskModel);

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            await db.SaveChangesAsync();

            return CreatedAtRoute("DefaultApi", new { id = taskModel.Id }, taskModel);
        }

        // DELETE: api/Tasks/5
        [ResponseType(typeof(TaskModel))]
        public async Task<IHttpActionResult> DeleteTaskModel(int id)
        {
            TaskModel taskModel = await db.TaskModels.FindAsync(id);
            if (taskModel == null)
            {
                return NotFound();
            }

            db.TaskModels.Remove(taskModel);
            await db.SaveChangesAsync();

            return Ok(taskModel);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool TaskModelExists(int id)
        {
            return db.TaskModels.Count(e => e.Id == id) > 0;
        }
    }
}