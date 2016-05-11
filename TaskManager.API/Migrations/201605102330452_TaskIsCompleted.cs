namespace TaskManager.API.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class TaskIsCompleted : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.TaskModels", "IsCompleted", c => c.Boolean(nullable: false));
            DropColumn("dbo.TaskModels", "Completed");
        }
        
        public override void Down()
        {
            AddColumn("dbo.TaskModels", "Completed", c => c.Boolean(nullable: false));
            DropColumn("dbo.TaskModels", "IsCompleted");
        }
    }
}
