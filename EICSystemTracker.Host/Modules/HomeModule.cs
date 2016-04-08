
using Nancy;

namespace EICSystemTracker.Host.Modules
{
    public class HomeModule : NancyModule
    {
        public HomeModule() : base("")
        {
            Get["/"] = x =>
            {
                return Response.AsFile("EICSystemTracker.Web/index.html", "text/html");
            };
        }
    }
}
