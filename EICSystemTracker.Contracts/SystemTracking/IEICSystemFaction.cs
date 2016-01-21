using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EICSystemTracker.Contracts.SystemTracking
{
    public interface IEICSystemFaction
    {
        int Id { get; }
        IEICSystem System { get; set; }
        IEICFaction Faction { get; set; }
        double Influence { get; set; }
        string CurrentState { get; set; }
        string PendingState { get; set; }
        string RecoveringState { get; set; }
        string UpdatedBy { get; set; }
    }
}
