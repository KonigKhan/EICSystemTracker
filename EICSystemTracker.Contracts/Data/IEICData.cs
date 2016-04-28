using EICSystemTracker.Contracts.SystemTracking;
using System;
using System.Collections.Generic;
using EICSystemTracker.Contracts.domain.UserData;
using EICSystemTracker.Contracts.UserData;

namespace EICSystemTracker.Contracts.Data
{
    public interface IEICData : IDisposable
    {
        void TrackSystem(IEICSystem system);

        void TrackSystemActivity(IEICSystemActivity activity);

        List<IEICSystem> GetAllSystems();

        List<string> GetAllFactionNames();

        List<IEICSystem> GetLatestEICSystemFactionTracking();

        IEICSystem GetSystem(string systemName);

        List<IEICSystemFaction> GetFactionHistoryForSystem(string systemName);

        void RegisterNewCommander(string cmdrName, string password);

        ICommander GetCommanderByCmdrNameAndPassword(string cmdrName, string password);
    }
}