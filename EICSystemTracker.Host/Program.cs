using System;
using EICSystemTracker.Host.Util;
using Microsoft.Owin.Hosting;
using System.IO;
using Newtonsoft.Json;

namespace EICSystemTracker.Host
{
    class Program
    {
        static void Main(string[] args)
        {
            Utilities.SetConfig();

            var uris = Utilities.GetUriParams(StaticProperties.UserConfig.HostPort);
            var owinStartupOptions = new StartOptions();


            foreach (var uri in uris)
            {
                owinStartupOptions.Urls.Add(uri.ToString());
            }

            using (WebApp.Start<SelfHost.OwinStartup>(owinStartupOptions))
            {
                var tracker = new EDLogsTracker();
                if (Directory.Exists(Util.Utilities.GetNetLogPath()))
                {
                    // Set up log file watcher...
                    tracker.StartWatching();
                }

                // todo: create tray icon instead of console app...
                Console.WriteLine("\nEIC System Tracker Host. Running at:\n");

                Console.ForegroundColor = ConsoleColor.Green;
                foreach (var uri in uris)
                    Console.WriteLine("\t" + uri.ToString());

                // Start Chrome
                System.Diagnostics.Process.Start("chrome", uris[0].AbsoluteUri);

                Console.ResetColor();
                Console.Write("\n\nPress \'Enter\' to exit.");
                Console.ReadLine();
            }

            Utilities.SaveConfig();
        }
    }
}
