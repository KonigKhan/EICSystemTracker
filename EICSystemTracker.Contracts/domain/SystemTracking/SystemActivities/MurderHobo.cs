using System;
using EICSystemTracker.Contracts.SystemTracking;
using EICSystemTracker.Contracts.SystemTracking.SystemActivities;

namespace EICSystemTracker.Contracts.domain.SystemTracking.SystemActivities
{
    public class MurderHobo : IMurderHobo
    {
        public ActivityType Type => ActivityType.MurderHobo;
        public string SystemName { get; set; }
        public DateTime Timestamp { get; set; }
        public string Cmdr { get; set; }
        public int BountyEarnet { get; set; }
    }
}