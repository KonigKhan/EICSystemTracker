namespace EICSystemTracker.Contracts.SystemTracking.SystemActivities
{
    interface ITrading : IEICSystemActivity
    {
        int Tonnage { get; set; }
    }
}
