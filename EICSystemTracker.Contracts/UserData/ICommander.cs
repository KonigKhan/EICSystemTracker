using System;

namespace EICSystemTracker.Contracts.UserData
{
    public interface ICommander
    {
        string CommanderName { get; set; }
        string Password { get; set; }
    }
}