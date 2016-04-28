using EICSystemTracker.Contracts;
using EICSystemTracker.Contracts.Data;
using EICSystemTracker.Contracts.SystemTracking;
using EICSystemTracker.Data;
using System;
using System.Collections.Generic;
using EICSystemTracker.Contracts.UserData;

namespace EICSystemTracker.Service
{
    public class EICSystemTrackerService : IEICSystemTrackerService
    {
        public void TrackSystemActivity(IEICSystemActivity activity)
        {
            using (var da = EICDataFactory.GetDataAdapter(DataAdapterType.MSSql))
            {
                da.TrackSystemActivity(activity);
            }
        }

        public List<IEICSystem> GetLatestSystemTrackingData()
        {
            using (var da = EICDataFactory.GetDataAdapter(DataAdapterType.MSSql))
            {
                return da.GetLatestEICSystemFactionTracking();
            }
        }

        public void TrackSystem(IEICSystem system)
        {
            using (var da = EICDataFactory.GetDataAdapter(DataAdapterType.MSSql))
            {
                da.TrackSystem(system);
            }
        }

        public IEICSystem GetSystem(string systemName)
        {
            using (var da = EICDataFactory.GetDataAdapter(DataAdapterType.MSSql))
            {
                return da.GetSystem(systemName);
            }
        }

        public List<string> GetFactionNames()
        {
            using (var da = EICDataFactory.GetDataAdapter(DataAdapterType.MSSql))
            {
                return da.GetAllFactionNames();
            }
        }

        public List<IEICSystemFaction> GetFactionHistoryForSystem(string systemName)
        {
            using (var da = EICDataFactory.GetDataAdapter(DataAdapterType.MSSql))
            {
                throw new NotImplementedException();
            }
        }

        public void RegisterNewCommander(string cmdrName, string password)
        {
            using (var da = EICDataFactory.GetDataAdapter(DataAdapterType.MSSql))
            {
                da.RegisterNewCommander(cmdrName, password);
            }
        }

        public ICommander GetCommanderByCmdrNameAndPassword(string cmdrName, string password)
        {
            using (var da = EICDataFactory.GetDataAdapter(DataAdapterType.MSSql))
            {
                return da.GetCommanderByCmdrNameAndPassword(cmdrName, password);
            }
        }
    }
}
