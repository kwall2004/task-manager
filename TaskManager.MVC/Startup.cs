using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(TaskManager.MVC.Startup))]
namespace TaskManager.MVC
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
