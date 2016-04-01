using System;
using EICSystemTracker.Contracts.SystemTracking;
using System.Collections.Generic;

namespace EICSystemTracker.Contracts.domain.SystemTracking
{
    public class EICSystem : IEICSystem
    {
        public int Id { get; }
        public string Name { get; set; }
        public int Traffic { get; set; }
        public Int64 Population { get; set; }
        public string Government { get; set; }
        public string Allegiance { get; set; }
        public string State { get; set; }
        public string Security { get; set; }
        public string Economy { get; set; }
        public string Power { get; set; }
        public string PowerState { get; set; }
        public bool NeedPermit { get; set; }
        public DateTime LastUpdated { get; set; }
        public string ChartColor { get; set; }
        public List<IEICSystemFaction> TrackedFactions { get; set; }
    }
}
