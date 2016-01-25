using System.Data;
using EICSystemTracker.Contracts.Data.DataAdapters.Query;

namespace EICSystemTracker.Contracts.Data.DataAdapters.Relational
{
    public interface IRelationalDataAdapter: IDataAdapter
    {
        void ExecuteNonQueryProcedure(IStoredProcedureConfig cfg);
        DataTable ExecuteProcedure(IStoredProcedureConfig cfg);
    }
}
