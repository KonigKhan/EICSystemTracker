namespace EICSystemTracker.Contracts.SystemTracking.SystemActivities
{
    public interface IMissions : IEICSystemActivity
    {
        int NumHigh { get; set; }
        int NumMed { get; set; }
        int NumLow { get; set; }
    }
}
