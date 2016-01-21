using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EICSystemTracker.Contracts.SystemTracking
{
    public interface IEICSystem
    {
        int Id { get; }
        string Name { get; set; }
        int Traffic { get; set; }
        int Population { get; set; }
        string Government { get; set; }
        string Security { get; set; }
        string ControllingPower { get; set; }
    }
}
