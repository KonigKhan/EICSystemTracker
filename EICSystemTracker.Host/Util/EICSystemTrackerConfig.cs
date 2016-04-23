using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using EICSystemTracker.Contracts;

namespace EICSystemTracker.Host.Util
{
    public class EICSystemTrackerConfig : IEICSystemTrackerConfig
    {
        public int HostPort { get; set; }
        public string EliteDangerousNetLogPath { get; set; }
        public string CmdrName { get; set; }

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
