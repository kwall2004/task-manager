namespace TaskManager.API.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class TaskUserNotRequired : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.TaskModels", "User_Id", "dbo.AspNetUsers");
            DropIndex("dbo.TaskModels", new[] { "User_Id" });
            AlterColumn("dbo.TaskModels", "User_Id", c => c.String(maxLength: 128));
            CreateIndex("dbo.TaskModels", "User_Id");
            AddForeignKey("dbo.TaskModels", "User_Id", "dbo.AspNetUsers", "Id");
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.TaskModels", "User_Id", "dbo.AspNetUsers");
            DropIndex("dbo.TaskModels", new[] { "User_Id" });
            AlterColumn("dbo.TaskModels", "User_Id", c => c.String(nullable: false, maxLength: 128));
            CreateIndex("dbo.TaskModels", "User_Id");
            AddForeignKey("dbo.TaskModels", "User_Id", "dbo.AspNetUsers", "Id", cascadeDelete: true);
        }
    }
}
