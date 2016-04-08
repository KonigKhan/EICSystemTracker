using Nancy;
using Nancy.Bootstrappers.Autofac;
using Nancy.Conventions;

namespace EICSystemTracker.Host
{
    public class NancyBootstrapper : AutofacNancyBootstrapper
    {
        protected override IRootPathProvider RootPathProvider
        {
            get { return new CustomRootPathProvider(); }
        }

        protected override void ConfigureConventions(Nancy.Conventions.NancyConventions nancyConventions)
        {
            nancyConventions.StaticContentsConventions.Clear();
            nancyConventions.StaticContentsConventions.Add(
                StaticContentConventionBuilder.AddDirectory("/", @"EICSystemTracker.Web")
            );

            base.ConfigureConventions(nancyConventions);
        }
    }
}
