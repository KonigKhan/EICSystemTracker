using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EICSystemTracker.Host.EliteDangerous
{
    public class EdLogLineSystemArgs : EventArgs
    {
        public string SystemName { get; set; }

        public EdLogLineSystemArgs(string systemName)
        {
            this.SystemName = systemName;
        }
    }
}
