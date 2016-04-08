using Nancy;
using System;
using System.IO;

namespace EICSystemTracker.Host
{
    public class CustomRootPathProvider : IRootPathProvider
    {
        static string path;
        static CustomRootPathProvider()
        {
            // Debug has a different path than release...
#if DEBUG
            path = Path.GetFullPath(Path.Combine(Environment.CurrentDirectory, @"..\..\..\"));
            if (!Directory.Exists(path))
                throw new DirectoryNotFoundException("Cannot find web directory");
#else
            path = Path.GetFullPath(Environment.CurrentDirectory);
            if (!Directory.Exists(path))
                throw new DirectoryNotFoundException("Cannot find web directory");
#endif
        }

        public string GetRootPath()
        {
            return path;
        }
    }
}
