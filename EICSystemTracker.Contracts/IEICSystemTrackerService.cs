using System.Collections.Generic;
using EICSystemTracker.Contracts.SystemTracking;

namespace EICSystemTracker.Contracts
{
    public interface IEICSystemTrackerService
    {
        List<IEICSystem> GetSystems();
    }
}