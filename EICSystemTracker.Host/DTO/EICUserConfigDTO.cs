using EICSystemTracker.Contracts;

namespace EICSystemTracker.Host.DTO
{
    public class EICUserConfigDTO
    {
        public int HostPort { get; set; }
        public string EliteDangerousNetLogPath { get; set; }
        public string CmdrName { get; set; }
    }
}