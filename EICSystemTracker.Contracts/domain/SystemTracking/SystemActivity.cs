using EICSystemTracker.Contracts.SystemTracking;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EICSystemTracker.Contracts.domain.SystemTracking
{
    public class SystemActivity : ISystemActivity
    {
        public string Name { get; set; }
    }
}
