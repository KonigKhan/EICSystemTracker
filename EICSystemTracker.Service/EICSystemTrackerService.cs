﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using EICSystemTracker.Contracts;
using EICSystemTracker.Contracts.Data;
using EICSystemTracker.Contracts.SystemTracking;
using EICSystemTracker.Data;

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
    }
}
