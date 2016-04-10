using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EICSystemTracker.Contracts.SystemTracking
{
    interface IEICSystemActivity
    {
        ActivityType Type { get; }
        string SystemName { get; set; }
        DateTime Timestamp { get; set; }
        string Cmdr { get; set; }
    }
}
