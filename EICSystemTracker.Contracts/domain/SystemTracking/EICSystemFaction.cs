using EICSystemTracker.Contracts.SystemTracking;

namespace EICSystemTracker.Contracts.domain.SystemTracking
{
    public class EICSystemFaction : IEICSystemFaction
    {
        public int Id { get; }
        public IEICSystem System { get; set; }
        public IEICFaction Faction { get; set; }
        public double Influence { get; set; }
        public string CurrentState { get; set; }
        public string PendingState { get; set; }
        public string RecoveringState { get; set; }
        public string UpdatedBy { get; set; }
        public System.DateTime LastUpdated { get; set; }
    }
}