namespace EICSystemTracker.Contracts
{
    public interface IEICSystemTrackerConfig
    {
        int HostPort { get; set; }
        string EliteDangerousNetLogPath { get; set; }
        string CmdrName { get; set; }
    }
}