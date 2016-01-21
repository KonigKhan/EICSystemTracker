using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EICSystemTracker.Contracts.Data.DataAdapters.Query
{
    public interface IStoredProcedureConfig
    {
        string ProcedureName { get; set; }
        Dictionary<string, object> Parameters { get; set; }
    }
}
