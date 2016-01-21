using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using EICSystemTracker.Contracts.domain.Data.DataAdapters.Query;
using EICSystemTracker.Contracts.Data;
using EICSystemTracker.Contracts.Data.DataAdapters.Relational;
using EICSystemTracker.Contracts.SystemTracking;
using EICSystemTracker.Data.EICDataAdapters;
using MySql.Data.MySqlClient;

namespace EICSystemTracker.Data.EICData
{
    public class MySqlEICData : IEICData
    {
        private readonly IRelationalDataAdapter _dataAdapter;

        public MySqlEICData(string server, string dataBase, string userName, string password)
        {
            MySqlConnectionStringBuilder connStrBuilder = new MySqlConnectionStringBuilder();
            connStrBuilder.Server = server;
            connStrBuilder.Database = dataBase;
            connStrBuilder.UserID = userName;
            connStrBuilder.Password = password;

            this._dataAdapter = new MySqlEICDataAdapter(connStrBuilder.GetConnectionString(true));
        }

        public void AddSystemFactionTracking(IEICSystemFaction systemFaction)
        {
            var sprocConfig = new StoredProcedureConfig
            {
                ProcedureName = "add_systemfactiontracking",
                Parameters =
                {
                    ["@sysName"] = systemFaction.System.Name,
                    ["@sysTraffic"] = systemFaction.System.Traffic,
                    ["@sysPopulation"] = systemFaction.System.Population,
                    ["@sysGovernment"] = systemFaction.System.Government,
                    ["@sysSecurity"] = systemFaction.System.Security,
                    ["@sysPower"] = systemFaction.System.ControllingPower,
                    ["@facName"] = systemFaction.Faction.Name,
                    ["@facAllegiance"] = systemFaction.Faction.Allegiance,
                    ["@facInfluence"] = systemFaction.Influence,
                    ["@facCurrentState"] = systemFaction.CurrentState,
                    ["@facPendingState"] = systemFaction.PendingState,
                    ["@facRecoverState"] = systemFaction.RecoveringState,
                    ["@controllingFaction"] = false,
                    ["@updatedBy"] = systemFaction.UpdatedBy
                }
            };

            _dataAdapter.ExecuteNonQueryProcedure(sprocConfig);
        }

        public List<IEICSystem> GetAllSystems()
        {
            throw new NotImplementedException();
        }

        public List<IEICFaction> GetAllFactions()
        {
            throw new NotImplementedException();
        }

        public void Dispose()
        {
            _dataAdapter.Dispose();
        }
    }
}
