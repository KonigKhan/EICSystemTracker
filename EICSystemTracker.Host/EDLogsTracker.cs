using EICSystemTracker.Host.EliteDangerous;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EICSystemTracker.Host
{
    public class EDLogsTracker : IDisposable
    {
        private EdLogWatcher edLogWatcher = null;

        public void StartWatching()
        {
            edLogWatcher = new EdLogWatcher();

            // subscribe to log file updates...
            edLogWatcher.ClientArrivedtoNewSystem += OnClientArrivedtoNewSystem;

            // After event subscription, initialize
            edLogWatcher.Initialize();
            edLogWatcher.StartWatcher();
        }

        private void OnClientArrivedtoNewSystem(object sender, EdLogLineSystemArgs e)
        {
            Util.StaticProperties.ClientCurrentSystemName = e.SystemName;
        }

        public void Dispose()
        {
            if (edLogWatcher != null)
                edLogWatcher.StopWatcher();
        }
    }
}
