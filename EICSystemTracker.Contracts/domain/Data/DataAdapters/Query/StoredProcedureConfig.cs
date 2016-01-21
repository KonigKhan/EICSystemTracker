using System.Collections.Generic;
using EICSystemTracker.Contracts.Data.DataAdapters.Query;

namespace EICSystemTracker.Contracts.domain.Data.DataAdapters.Query
{
    public class StoredProcedureConfig : IStoredProcedureConfig
    {
        public string ProcedureName { get; set; }
        public Dictionary<string, object> Parameters { get; set; }

        public StoredProcedureConfig()
        {
            this.Parameters = new Dictionary<string, object>();
        }
    }
}
