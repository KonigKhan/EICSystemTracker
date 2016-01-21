namespace EICSystemTracker.Contracts.SystemTracking
{
    public interface IEICFaction
    {
        int Id { get; }
        string Name { get; set; }
        string Allegiance { get; set; }
    }
}
