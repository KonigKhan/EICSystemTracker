using System.Collections.Generic;
using EICSystemTracker.Contracts.SystemTracking;

namespace EICSystemTracker.Contracts
{
    public interface IEICSystemTrackerService
    {
        void TrackSystem(IEICSystem systemFaction);
        void TrackSystemActivity(IEICSystemActivity activity);

        List<IEICSystem> GetLatestSystemTrackingData();
        IEICSystem GetSystem(string systemName);
        List<string> GetFactionNames();
        List<IEICSystemFaction> GetFactionHistoryForSystem(string systemName);
    }
}