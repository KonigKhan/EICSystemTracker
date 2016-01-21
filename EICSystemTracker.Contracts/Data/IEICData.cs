using EICSystemTracker.Contracts.SystemTracking;
using System;
using System.Collections.Generic;

namespace EICSystemTracker.Contracts.Data
{
    public interface IEICData : IDisposable
    {
        void AddSystemFactionTracking(IEICSystemFaction systemFaction);

        List<IEICSystem> GetAllSystems();
        List<IEICFaction> GetAllFactions();
    }
}
