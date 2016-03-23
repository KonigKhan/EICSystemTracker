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

        public void TrackSystem(IEICSystem system)
        {
            var timestamp = DateTime.UtcNow;

            // get system
            EDSystem sys = (from s in _eicData.EDSystems where s.Name == system.Name select s).FirstOrDefault();

            var trackSys = new Track_System()
            {
                Traffic = system.Traffic,
                Population = system.Population,
                Government = system.Government,
                Allegiance = system.Allegiance,
                State = system.State,
                Security = system.Security,
                Economy = system.Economy,
                ControllingPower = system.Power,
                ControllingPowerState = system.PowerState,
                NeedPermit = system.NeedPermit,
                Timestamp = timestamp
            };

            if (sys == null)
            {
                sys = new EDSystem();
                sys.Name = system.Name;
                sys.Track_Systems.Add(trackSys);
                _eicData.EDSystems.InsertOnSubmit(sys);
            }
            else
            {
                sys.Name = system.Name;
                sys.Track_Systems.Add(trackSys);
            }

            foreach (IEICSystemFaction trackedFaction in system.TrackedFactions)
            {
                EDFaction fac = (from f in _eicData.EDFactions where f.Name == trackedFaction.Faction.Name select f).FirstOrDefault();

                if (fac == null)
                {
                    fac = new EDFaction();
                    fac.Name = trackedFaction.Faction.Name;
                    _eicData.EDFactions.InsertOnSubmit(fac);
                }
                else
                {
                    fac.Name = trackedFaction.Faction.Name;
                }

                Track_SystemFaction tracking = new Track_SystemFaction();
                tracking.EDSystem = sys;
                tracking.EDFaction = fac;
                tracking.Influence = Convert.ToDecimal(trackedFaction.Influence);
                tracking.CurrentState = trackedFaction.CurrentState;
                tracking.PendingState = trackedFaction.PendingState;
                tracking.RecoveringState = trackedFaction.RecoveringState;
                tracking.UpdateBy = trackedFaction.UpdatedBy;
                tracking.Timestamp = timestamp;

                _eicData.Track_SystemFactions.InsertOnSubmit(tracking);
            }

            _eicData.SubmitChanges();
        }

        public List<IEICFaction> GetAllFactions()
        {
            var allFactions = new List<IEICFaction>();

            allFactions = (from f in _eicData.EDFactions
                          select new EICFaction()
                          {
                              Name = f.Name
                          }).ToList<IEICFaction>();

            return allFactions;
        }

        public List<IEICSystem> GetAllSystems()
        {
            var allSystems = new List<IEICSystem>();

            allSystems = (from s in _eicData.EDSystems
                          select new EICSystem()
                          {
                              Name = s.Name
                          }).ToList<IEICSystem>();

            return allSystems;
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
