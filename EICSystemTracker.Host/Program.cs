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
            SetConfig();

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

            SaveConfig();
        }

        /// <summary>
        /// Sets default config or loads cfg from application directory.
        /// </summary>
        private static void SetConfig()
        {
            var cfg = new EICSystemTrackerConfig();

            var cfgPath = Path.Combine(Environment.CurrentDirectory, Constants.USER_CONFIG_RELATIVE_PATH);
            if (File.Exists(cfgPath))
            {
                cfg = JsonConvert.DeserializeObject<EICSystemTrackerConfig>(File.ReadAllText(cfgPath));
            }

            StaticProperties.UserConfig = cfg;
        }

        /// <summary>
        /// Save configuration stored in StaticProperties.UserConfig.
        /// </summary>
        private static void SaveConfig()
        {
            var cfgPath = Path.Combine(Environment.CurrentDirectory, Constants.USER_CONFIG_RELATIVE_PATH);
            File.WriteAllText(cfgPath, JsonConvert.SerializeObject(StaticProperties.UserConfig));
        }
    }
}
