namespace EICSystemTracker.Contracts.SystemTracking.SystemActivities
{
    interface IBountyHunting : IEICSystemActivity
    {
        int CreditsClaimed { get; set; }
    }
}
