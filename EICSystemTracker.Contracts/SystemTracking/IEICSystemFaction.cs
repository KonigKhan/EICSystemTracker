using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EICSystemTracker.Contracts.SystemTracking
{
    public interface IEICSystemFaction
    {
        IEICSystem EICSystem { get; set; }
        IEICFaction EICFaction { get; set; }
    }
}
