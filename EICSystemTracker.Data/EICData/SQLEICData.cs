using EICSystemTracker.Contracts.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using EICSystemTracker.Contracts.SystemTracking;
using EICSystemTracker.Data.EICDataAdapters.MSSql;
using EICSystemTracker.Contracts.domain.SystemTracking;

namespace EICSystemTracker.Data.EICData
{
    class SQLEICData : IEICData
    {
        private readonly MSSqlEICDataDataContext _eicData;

        public SQLEICData(string server, string dataBase, string userName, string password)
        {
            System.Data.SqlClient.SqlConnectionStringBuilder builder = new System.Data.SqlClient.SqlConnectionStringBuilder();
            builder.DataSource = server;
            builder.InitialCatalog = dataBase;
            builder.UserID = userName;
            builder.Password = password;
            builder.PersistSecurityInfo = true;

            _eicData = new MSSqlEICDataDataContext(builder.ConnectionString);
        }

        public void AddSystemFactionTracking(IEICSystemFaction systemFaction)
        {

            var timestamp = DateTime.UtcNow;

            // get system
            EDSystem sys = (from s in _eicData.EDSystems where s.Name == systemFaction.System.Name select s).FirstOrDefault();
            if (sys == null)
            {
                sys = new EDSystem();
                sys.Name = systemFaction.System.Name;
                sys.Track_Systems.Add(new Track_System()
                {
                    Traffic = systemFaction.System.Traffic,
                    Population = systemFaction.System.Population,
                    Government = systemFaction.System.Government,
                    Allegiance = systemFaction.System.Allegiance,
                    State = systemFaction.System.State,
                    Security = systemFaction.System.Security,
                    Economy = systemFaction.System.Economy,
                    ControllingPower = systemFaction.System.Power,
                    ControllingPowerState = systemFaction.System.PowerState,
                    NeedPermit = systemFaction.System.NeedPermit,
                    Timestamp = timestamp
                });
                _eicData.EDSystems.InsertOnSubmit(sys);
            }
            else
            {
                sys.Name = systemFaction.System.Name;
                sys.Track_Systems.Add(new Track_System()
                {
                    Traffic = systemFaction.System.Traffic,
                    Population = systemFaction.System.Population,
                    Government = systemFaction.System.Government,
                    Allegiance = systemFaction.System.Allegiance,
                    State = systemFaction.System.State,
                    Security = systemFaction.System.Security,
                    Economy = systemFaction.System.Economy,
                    ControllingPower = systemFaction.System.Power,
                    ControllingPowerState = systemFaction.System.PowerState,
                    NeedPermit = systemFaction.System.NeedPermit,
                    Timestamp = timestamp
                });
            }

            EDFaction fac = (from f in _eicData.EDFactions where f.Name == systemFaction.Faction.Name select f).FirstOrDefault();
            if (fac == null)
            {
                fac = new EDFaction();
                fac.Name = systemFaction.Faction.Name;
                fac.Track_Factions.Add(new Track_Faction()
                {
                    Allegiance = "TODO",
                    Timestamp = timestamp
                });
                _eicData.EDFactions.InsertOnSubmit(fac);
            }
            else
            {
                fac.Name = systemFaction.Faction.Name;
                fac.Track_Factions.Add(new Track_Faction()
                {
                    Allegiance = "TODO",
                    Timestamp = timestamp
                });
            }

            Track_SystemFaction tracking = new Track_SystemFaction();
            tracking.EDSystem = sys;
            tracking.EDFaction = fac;
            tracking.Influence = Convert.ToDecimal(systemFaction.Influence);
            tracking.CurrentState = systemFaction.CurrentState;
            tracking.PendingState = systemFaction.PendingState;
            tracking.RecoveringState = systemFaction.RecoveringState;
            tracking.UpdateBy = systemFaction.UpdatedBy;
            tracking.Timestamp = timestamp;

            _eicData.Track_SystemFactions.InsertOnSubmit(tracking);

            _eicData.SubmitChanges();
        }

        public List<IEICFaction> GetAllFactions()
        {
            throw new NotImplementedException();
        }

        public List<IEICSystem> GetAllSystems()
        {
            throw new NotImplementedException();
        }

        public List<IEICSystemFaction> GetLatestEICSystemFactionTracking()
        {
            var latestTrackedData = (from t in _eicData.Track_SystemFactions
                                     group t by new { t.EDSystem, t.EDFaction } into t_grp
                                     select t_grp.OrderByDescending(t => t.Timestamp).FirstOrDefault())
                       .ToList().Select(dbsf => new EICSystemFaction()
                       {
                           System = GetLatestSystemInfo(dbsf.EDSystem),
                           Faction = GetLatestFactionInfo(dbsf.EDFaction),
                           Influence = Decimal.ToDouble(dbsf.Influence ?? 0),
                           CurrentState = dbsf.CurrentState,
                           PendingState = dbsf.PendingState,
                           RecoveringState = dbsf.RecoveringState,
                           UpdatedBy = dbsf.UpdateBy,
                           LastUpdated = dbsf.Timestamp
                       }).ToList<IEICSystemFaction>();

            return latestTrackedData;
        }

        private IEICFaction GetLatestFactionInfo(EDFaction dbFaction)
        {
            var fac = (from tf in dbFaction.Track_Factions
                       orderby tf.Timestamp descending
                       select new EICFaction()
                       {
                           Name = tf.EDFaction.Name
                       }).FirstOrDefault();

            return fac;
        }

        private IEICSystem GetLatestSystemInfo(EDSystem dbSystem)
        {
            var sys = (from ts in dbSystem.Track_Systems
                       orderby ts.Timestamp descending
                       select new EICSystem()
                       {
                           Name = ts.EDSystem.Name,
                           Allegiance = ts.Allegiance,
                           Economy = ts.Economy,
                           Government = ts.Government,
                           NeedPermit = ts.NeedPermit,
                           Population = ts.Population ?? 0,
                           Power = ts.ControllingPower,
                           PowerState = ts.ControllingPowerState,
                           Security = ts.Security,
                           State = ts.State,
                           Traffic = ts.Traffic ?? 0,
                           LastUpdated = ts.Timestamp
                       }).FirstOrDefault();

            return sys;
        }

        #region IDisposable Support
        private bool disposedValue = false; // To detect redundant calls

        protected virtual void Dispose(bool disposing)
        {
            if (!disposedValue)
            {
                if (disposing)
                {
                    // TODO: dispose managed state (managed objects).
                }

                // TODO: free unmanaged resources (unmanaged objects) and override a finalizer below.
                // TODO: set large fields to null.

                disposedValue = true;
            }
        }

        public void Dispose()
        {
            // Do not change this code. Put cleanup code in Dispose(bool disposing) above.
            Dispose(true);
            // TODO: uncomment the following line if the finalizer is overridden above.
            // GC.SuppressFinalize(this);
        }
        #endregion
    }
}
