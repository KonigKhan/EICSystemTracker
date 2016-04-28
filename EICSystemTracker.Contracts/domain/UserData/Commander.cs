using EICSystemTracker.Contracts.UserData;

namespace EICSystemTracker.Contracts.domain.UserData
{
    public class Cmdr : ICommander
    {
        public string CommanderName { get; set; }
        public string Password { get; set; }
    }
}