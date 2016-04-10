namespace EICSystemTracker.Contracts.SystemTracking.SystemActivities
{
    public interface ITrading : IEICSystemActivity
    {
        int Tonnage { get; set; }
    }
}
