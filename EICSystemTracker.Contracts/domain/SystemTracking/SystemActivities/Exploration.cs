using System;
using EICSystemTracker.Contracts.SystemTracking;
using EICSystemTracker.Contracts.SystemTracking.SystemActivities;

namespace EICSystemTracker.Contracts.domain.SystemTracking.SystemActivities
{
    public class Exploration : IExploration
    {
        public ActivityType Type => ActivityType.Exploration;
        public string SystemName { get; set; }
        public DateTime Timestamp { get; set; }
        public string Cmdr { get; set; }
        public int ValueSold { get; set; }
    }
}