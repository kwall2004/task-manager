namespace VectorformTest.API.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class TaskUserRequired : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.TaskModels", "User_Id", "dbo.AspNetUsers");
            DropIndex("dbo.TaskModels", new[] { "User_Id" });
            AlterColumn("dbo.TaskModels", "Description", c => c.String(nullable: false));
            AlterColumn("dbo.TaskModels", "User_Id", c => c.String(nullable: false, maxLength: 128));
            CreateIndex("dbo.TaskModels", "User_Id");
            AddForeignKey("dbo.TaskModels", "User_Id", "dbo.AspNetUsers", "Id", cascadeDelete: true);
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.TaskModels", "User_Id", "dbo.AspNetUsers");
            DropIndex("dbo.TaskModels", new[] { "User_Id" });
            AlterColumn("dbo.TaskModels", "User_Id", c => c.String(maxLength: 128));
            AlterColumn("dbo.TaskModels", "Description", c => c.String());
            CreateIndex("dbo.TaskModels", "User_Id");
            AddForeignKey("dbo.TaskModels", "User_Id", "dbo.AspNetUsers", "Id");
        }
    }
}
