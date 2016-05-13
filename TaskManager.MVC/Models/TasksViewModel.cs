using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace TaskManager.MVC.Models
{
    public class TasksViewModel
    {
        public List<TaskModel> Tasks { get; set; }
        public int ActiveCount { get; set; }
    }
}