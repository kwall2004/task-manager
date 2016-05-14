using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace VectorformTest.WebAPI.Models
{
    public class TaskModel
    {
        public int Id { get; set; }
        [JsonIgnore]
        public virtual ApplicationUser User { get; set; }
        [Required]
        public string Description { get; set; }
        public bool IsCompleted { get; set; }
    }
}