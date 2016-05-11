using System.Web;
using System.Web.Optimization;

namespace TaskManager.FrontEnd
{
    public class BundleConfig
    {
        // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery")
                .Include("~/Scripts/jquery-{version}.js"));

            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at http://modernizr.com to pick only the tests you need.
            bundles.Add(new ScriptBundle("~/bundles/modernizr")
                .Include("~/Scripts/modernizr-*"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap")
                .Include("~/Scripts/bootstrap.js",
                "~/Scripts/respond.js"));

            bundles.Add(new ScriptBundle("~/bundles/angular")
                .Include("~/Scripts/angular.js",
                "~/Scripts/angular-animate.js",
                "~/Scripts/angular-route.js",
                "~/Scripts/angular-sanitize.js",
                "~/Scripts/ngStorage.js",
                "~/Scripts/angular-ui/ui-bootstrap-tpls.js",
                "~/Scripts/loading-bar.js",
                "~/Scripts/angular-material/angular-material.js",
                "~/Scripts/angular-aria/angular-aria.js",
                "~/Scripts/lodash.js"));

            bundles.Add(new ScriptBundle("~/bundles/app")
                .Include("~/Client/app/app.js",
                "~/Client/app/services/*Service.js",
                "~/Client/app/directives/*Directive.js",
                "~/Client/app/controllers/*Controller.js"));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                "~/Content/angular-material.css",
                "~/Content/bootstrap.css",
                "~/Content/font-awesome.css",
                "~/Content/loading-bar.css",
                "~/Content/site.css"));
        }
    }
}
