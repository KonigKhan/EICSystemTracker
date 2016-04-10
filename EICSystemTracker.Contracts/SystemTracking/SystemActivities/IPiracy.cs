namespace EICSystemTracker.Contracts.SystemTracking.SystemActivities
{
    interface IPiracy : IEICSystemActivity
    {
        int ShipsTaken { get; set; }
        int TonsSold { get; set; }
    }
}
