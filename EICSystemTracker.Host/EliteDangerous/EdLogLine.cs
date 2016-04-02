using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EICSystemTracker.Host.EliteDangerous
{
    class EdLogLine
    {
        public DateTime Date { get; set; }
        public bool isSystem { get; set; }
        public string SystemName { get; set; }
        private string line { get; set; }

        public EdLogLine(string logline)
        {
            if (!logline.StartsWith("{")) { return; } //If it doesnt starts with a { its a metadata line, not a logline with timestamp
            Date = DateTime.Parse(logline.Substring(1, 8)); //The DATE itself it not written just Time. Don't care to do magic to figure out the date before we need it!

            line = logline.Substring(11);
            if (line.StartsWith("System:"))
            {
                var startOfSystemName = line.IndexOf("(", StringComparison.Ordinal);
                var endOfSystemName = line.IndexOf(")", startOfSystemName, StringComparison.Ordinal);
                SystemName = line.Substring(startOfSystemName + 1, endOfSystemName - startOfSystemName - 1);
                isSystem = true;
            }
        }
    }
}
