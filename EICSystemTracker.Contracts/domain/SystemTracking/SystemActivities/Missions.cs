using System;
using EICSystemTracker.Contracts.SystemTracking;
using EICSystemTracker.Contracts.SystemTracking.SystemActivities;

namespace EICSystemTracker.Contracts.domain.SystemTracking.SystemActivities
{
    public class Missions : IMissions
    {
        public ActivityType Type => ActivityType.Missions;
        public string SystemName { get; set; }
        public DateTime Timestamp { get; set; }
        public string Cmdr { get; set; }
        public int NumHigh { get; set; }
        public int NumMed { get; set; }
        public int NumLow { get; set; }
    }
}