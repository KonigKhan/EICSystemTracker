using System;
using EICSystemTracker.Contracts.SystemTracking;

namespace EICSystemTracker.Contracts.domain.SystemTracking
{
    public class EICSystem : IEICSystem
    {
        public int Id { get; }
        public string Name { get; set; }
        public string ControllingFaction { get; set; }
        public int Traffic { get; set; }
        public int Population { get; set; }
        public string Government { get; set; }
        public string Allegiance { get; set; }
        public string State { get; set; }
        public string Security { get; set; }
        public string Economy { get; set; }
        public string Power { get; set; }
        public string PowerState { get; set; }
        public bool NeedPermit { get; set; }
        public DateTime LastUpdated { get; set; }

        public EICSystem() { }
        public EICSystem(IEICSystem system)
        {
            this.Id = system.Id;
            this.Name = system.Name;
            this.ControllingFaction = system.ControllingFaction;
            this.Traffic = system.Traffic;
            this.Population = system.Population;
            this.Government = system.Government;
            this.Allegiance = system.Allegiance;
            this.State = system.State;
            this.Security = system.Security;
            this.Economy = system.Economy;
            this.Power = system.Power;
            this.PowerState = system.PowerState;
            this.NeedPermit = system.NeedPermit;
            this.LastUpdated = system.LastUpdated;
        }
    }
}
