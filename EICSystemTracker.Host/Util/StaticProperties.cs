using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EICSystemTracker.Host.Util
{
    public class StaticProperties
    {
        public static EICSystemTrackerConfig UserConfig { get; set; }
        public static string ClientCurrentSystemName { get; set; }
    }
}
