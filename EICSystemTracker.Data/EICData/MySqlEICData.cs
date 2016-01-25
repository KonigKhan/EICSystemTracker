using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using EICSystemTracker.Contracts.domain.Data.DataAdapters.Query;
using EICSystemTracker.Contracts.domain.SystemTracking;
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
                    //["@sysTraffic"] = systemFaction.System.,
                    ["@sysPopulation"] = systemFaction.System.Population,
                    ["@sysGovernment"] = systemFaction.System.Government,
                    ["@sysSecurity"] = systemFaction.System.Security,
                    ["@sysPower"] = systemFaction.System.Power,
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

        public List<IEICSystemFaction> GetLatestEICSystemFactionTracking()
        {
            var sprocConfig = new StoredProcedureConfig
            {
                ProcedureName = "get_latestsystemfaction_tracking"
            };

            var dt = _dataAdapter.ExecuteProcedure(sprocConfig);
            var eicSystemFactions = dt.Select().Select(row => new EICSystemFaction()
            {
                System = new EICSystem()
                {
                    Name = row["system_name"].ToString(),
                    Traffic = int.Parse(row["system_traffic"].ToString()),
                    Population = int.Parse(row["system_population"].ToString()),
                    Government = row["system_government"].ToString(),
                    Allegiance = row["system_allegiance"].ToString(),
                    State = row["system_state"].ToString(),
                    Security = row["system_security"].ToString(),
                    Economy = row["system_economy"].ToString(),
                    Power = row["system_power"].ToString(),
                    PowerState = row["system_power_state"].ToString(),
                },
                Faction = new EICFaction()
                {
                    Name = row["faction_name"].ToString()
                },
                Influence = Double.Parse(row["systemfaction_influence"].ToString()),
                CurrentState = row["systemfaction_currentstate"].ToString(),
                PendingState = row["systemfaction_pendingstate"].ToString(),
                RecoveringState = row["systemfaction_recoveringstate"].ToString()

            }).ToList<IEICSystemFaction>();

            return eicSystemFactions;
        }

        public void Dispose()
        {
            _dataAdapter.Dispose();
        }
    }
}
