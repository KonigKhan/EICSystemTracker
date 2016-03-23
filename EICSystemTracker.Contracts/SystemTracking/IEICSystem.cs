using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EICSystemTracker.Contracts.SystemTracking
{
    public interface IEICSystem
    {
        string Name { get; set; }
        int Traffic { get; set; }
        int Population { get; set; }
        string Government { get; set; }
        string Allegiance { get; set; }
        string State { get; set; }
        string Security { get; set; }
        string Economy { get; set; }
        string Power { get; set; }
        string PowerState { get; set; }
        bool NeedPermit { get; set; }
        DateTime LastUpdated { get; set; }

        List<IEICSystemFaction> TrackedFactions { get; set; }
    }
}
