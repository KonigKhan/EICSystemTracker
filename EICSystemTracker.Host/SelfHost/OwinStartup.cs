using Owin;

namespace EICSystemTracker.Host.SelfHost
{
    public class OwinStartup
    {
        public void Configuration(IAppBuilder app)
        {
            app.UseNancy();
        }
    }
}
