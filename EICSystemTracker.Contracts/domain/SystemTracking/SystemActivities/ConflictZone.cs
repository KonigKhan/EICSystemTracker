using System;
using EICSystemTracker.Contracts.SystemTracking;
using EICSystemTracker.Contracts.SystemTracking.SystemActivities;

namespace EICSystemTracker.Contracts.domain.SystemTracking.SystemActivities
{
    public class ConflictZone : IConflictZone
    {
        public ActivityType Type => ActivityType.ConflictZone;
        public string SystemName { get; set; }
        public DateTime Timestamp { get; set; }
        public string Cmdr { get; set; }
        public int CreditsClaimed { get; set; }
    }
}