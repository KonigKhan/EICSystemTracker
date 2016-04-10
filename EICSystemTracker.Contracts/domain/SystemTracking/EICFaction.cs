using EICSystemTracker.Contracts.SystemTracking;

namespace EICSystemTracker.Contracts.domain.SystemTracking
{
    public class EICFaction : IEICFaction
    {
        public string Name { get; set; }
        public string ChartColor { get; set; }
        public string Alliance { get; set; }
    }
}
