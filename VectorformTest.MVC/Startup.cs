using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(VectorformTest.MVC.Startup))]
namespace VectorformTest.MVC
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
