﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EICSystemTracker.Contracts.SystemTracking
{
    public interface IEICSystemActivity
    {
        string ActivityType { get; set; }
        ISystemActivity Activity { get; set; }
        string Cmdr { get; set; }
    }
}
