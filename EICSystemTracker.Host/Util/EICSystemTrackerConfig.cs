using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EICSystemTracker.Host.Util
{
    public class EICSystemTrackerConfig
    {
        public int HostPort { get; set; }
        public string EliteDangerousNetLogPath { get; set; }

        /// <summary>
        /// System Configuration.
        /// Default values are set in constructor.
        /// Application will save json file to UserConfig.json
        /// </summary>
        public EICSystemTrackerConfig()
        {
            this.HostPort = 8080;
            this.EliteDangerousNetLogPath = null;
        }
    }
}
