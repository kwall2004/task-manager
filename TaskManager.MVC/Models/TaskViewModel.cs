using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TaskManager.MVC.Models
{
    public class TaskViewModel
    {
        public int Id { get; set; }
        public string Description { get; set; }
        public bool IsCompleted { get; set; }
    }
}