using EICSystemTracker.Contracts.SystemTracking;
using System;
using System.Collections.Generic;

namespace EICSystemTracker.Contracts.Data
{
    public interface IEICData : IDisposable
    {
        void TrackSystem(IEICSystem system);

        List<IEICSystem> GetAllSystems();

        List<string> GetAllFactionNames();

        List<IEICSystem> GetLatestEICSystemFactionTracking();

        IEICSystem GetSystem(string systemName);
    }
}