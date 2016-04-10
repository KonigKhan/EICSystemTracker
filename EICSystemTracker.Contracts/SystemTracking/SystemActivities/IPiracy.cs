namespace EICSystemTracker.Contracts.SystemTracking.SystemActivities
{
    public interface IPiracy : IEICSystemActivity
    {
        int ShipsTaken { get; set; }
        int TonsSold { get; set; }
    }
}
