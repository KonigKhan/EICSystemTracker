using System;
using EICSystemTracker.Contracts.SystemTracking;

namespace EICSystemTracker.Contracts.domain.SystemTracking
{
    public class EICSystem : IEICSystem
    {
        public int Id { get; private set; }
        public string Name { get; set; }
        public int Traffic { get; set; }
        public int Population { get; set; }
        public string Security { get; set; }
        public string Government { get; set; }
        public string ControllingPower { get; set; }

        public EICSystem()
        {

        }

        public EICSystem(IEICSystem eicSystem)
        {
            this.Id = eicSystem.Id;
            this.Name = eicSystem.Name;
            this.Traffic = eicSystem.Traffic;
            this.Population = eicSystem.Population;
            this.Security = eicSystem.Security;
            this.Government = eicSystem.Government;
            this.ControllingPower = eicSystem.ControllingPower;
        }
    }
}
