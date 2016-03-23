using EICSystemTracker.Contracts.SystemTracking;

namespace EICSystemTracker.Contracts.domain.SystemTracking
{
    public class EICFaction : IEICFaction
    {
        public int Id { get; private set; }
        public string Name { get; set; }
        public string Allegiance { get; set; }

        public EICFaction() { }
        public EICFaction(IEICFaction eicFaction)
        {
            this.Name = eicFaction.Name;
        }
    }
}
