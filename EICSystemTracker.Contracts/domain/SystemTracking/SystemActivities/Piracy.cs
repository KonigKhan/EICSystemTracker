using System;
using EICSystemTracker.Contracts.SystemTracking;
using EICSystemTracker.Contracts.SystemTracking.SystemActivities;

namespace EICSystemTracker.Contracts.domain.SystemTracking.SystemActivities
{
    public class Piracy : IPiracy
    {
        public ActivityType Type => ActivityType.Piracy;
        public string SystemName { get; set; }
        public DateTime Timestamp { get; set; }
        public string Cmdr { get; set; }
        public int ShipsTaken { get; set; }
        public int TonsSold { get; set; }
    }
}