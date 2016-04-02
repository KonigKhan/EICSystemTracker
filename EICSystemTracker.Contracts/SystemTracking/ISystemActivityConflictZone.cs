using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EICSystemTracker.Contracts.SystemTracking
{
    public interface ISystemActivityConflictZone : ISystemActivity
    {
        string Faction { get; set; }
        long CombatBonds { get; set; }
    }
}
