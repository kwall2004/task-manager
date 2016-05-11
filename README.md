# API

The API project was started with the Visual Studio 2015 ASP.NET Web API (Individual User Accounts Authentication) template.  It uses the default of using a LocalDB database.  This database is included in the repo.

All the front-end parts of the project (BundleConfig, NuGet JavaScript libraries, etc.) were removed and the Start Action was configured to not open a page.  It is configured to run in IIS Express on port 62386 and the front-end is configured to expect it there.  Both projects are set as startup projects.

The Tasks table was added to the database through an Entity Framework Code First migration.

Support for CORS was added.

# FrontEnd

The FrontEnd project was started with the Visual Studio 2015 ASP.NET MVC (No Authentication) template.  The ASP.NET MVC part of the project exists only to initiate the application and provide bundling and minification.  The Index and _Layout Views create an SPA using AngularJS.

The authentication views are Angular versions of the views from the ASP.NET MVC (Individual User Accounts Authentication) template.  The Login view requests an OAuth token from the API and stores it locally for all subsequent requests to the API.


