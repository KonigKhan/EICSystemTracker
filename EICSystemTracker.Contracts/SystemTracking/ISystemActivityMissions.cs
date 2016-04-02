using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EICSystemTracker.Contracts.SystemTracking
{
    public interface ISystemActivityMissions : ISystemActivity
    {
        string Faction { get; set; }
        int HighInfluence { get; set; }
        int MediumInfluence { get; set; }
        int LowInfluence { get; set; }
    }
}
