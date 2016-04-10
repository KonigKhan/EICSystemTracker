namespace EICSystemTracker.Host.DTO
{
    public class SystemFactionDTO
    {
        public EICFactionDTO Faction { get; set; }
        public double Influence { get; set; }
        public string CurrentState { get; set; }
        public string PendingState { get; set; }
        public string RecoveringState { get; set; }
        public string UpdatedBy { get; set; }
    }
}