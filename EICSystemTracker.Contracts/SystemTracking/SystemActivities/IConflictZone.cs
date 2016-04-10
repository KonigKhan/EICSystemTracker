namespace EICSystemTracker.Contracts.SystemTracking.SystemActivities
{
    public interface IConflictZone : IEICSystemActivity
    {
        int CreditsClaimed { get; set; }
    }
}