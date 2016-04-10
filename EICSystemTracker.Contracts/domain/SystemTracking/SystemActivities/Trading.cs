using System;
using EICSystemTracker.Contracts.SystemTracking;
using EICSystemTracker.Contracts.SystemTracking.SystemActivities;

namespace EICSystemTracker.Contracts.domain.SystemTracking.SystemActivities
{
    public class Trading : ITrading
    {
        public ActivityType Type => ActivityType.Trade;
        public string SystemName { get; set; }
        public DateTime Timestamp { get; set; }
        public string Cmdr { get; set; }
        public int Tonnage { get; set; }
    }
}