using EICSystemTracker.Contracts.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using EICSystemTracker.Contracts.SystemTracking;
using EICSystemTracker.Data.EICDataAdapters.MSSql;
using EICSystemTracker.Contracts.domain.SystemTracking;
using System.Runtime.Caching;

namespace EICSystemTracker.Data.EICData
{
    class SQLEICData : IEICData
    {
        private readonly MSSqlEICDataDataContext _eicData;
        // TODO: Caching... private static ObjectCache cache = MemoryCache.Default;

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
                Timestamp = system.LastUpdated == DateTime.MinValue ? timestamp : system.LastUpdated
            };

            if (sys == null)
            {
                sys = new EDSystem();
                sys.Name = system.Name;
                sys.ChartColor = GetRandomColor();
                sys.Track_Systems.Add(trackSys);
                _eicData.EDSystems.InsertOnSubmit(sys);
            }
            else
            {
                sys.Name = system.Name;
                if (string.IsNullOrEmpty(sys.ChartColor))
                {
                    sys.ChartColor = GetRandomColor();
                }
                sys.Track_Systems.Add(trackSys);
            }

            foreach (IEICSystemFaction trackedFaction in system.TrackedFactions)
            {
                EDFaction fac = (from f in _eicData.EDFactions where f.Name == trackedFaction.Faction.Name select f).FirstOrDefault();

                if (fac == null)
                {
                    fac = new EDFaction();
                    fac.Name = trackedFaction.Faction.Name;
                    fac.ChartColor = GetRandomColor();
                    _eicData.EDFactions.InsertOnSubmit(fac);
                }
                else
                {
                    fac.Name = trackedFaction.Faction.Name;
                    if (string.IsNullOrEmpty(fac.ChartColor))
                    {
                        fac.ChartColor = GetRandomColor();
                    }
                }

                Track_SystemFaction tracking = new Track_SystemFaction();
                tracking.EDSystem = sys;
                tracking.EDFaction = fac;
                tracking.Influence = Convert.ToDecimal(trackedFaction.Influence);
                tracking.CurrentState = trackedFaction.CurrentState;
                tracking.PendingState = trackedFaction.PendingState;
                tracking.RecoveringState = trackedFaction.RecoveringState;
                tracking.UpdateBy = trackedFaction.UpdatedBy;
                tracking.Timestamp = trackedFaction.LastUpdated == DateTime.MinValue ? timestamp : trackedFaction.LastUpdated;

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

        public List<IEICSystem> GetLatestEICSystemFactionTracking()
        {
            var systemsToReturn = new List<IEICSystem>();

            var dbSystems = (from s in _eicData.EDSystems select s);
            foreach (var dbSystem in dbSystems)
            {
                var latestSystemInfo = GetLatestSystemInfo(dbSystem);
                var trackedFactions = (from tf in dbSystem.Track_SystemFactions
                                       group tf by new { tf.EDSystem, tf.EDFaction } into tf_grp
                                       select tf_grp.OrderByDescending(tf => tf.Timestamp).FirstOrDefault()).ToList();

                var system = new EICSystem();
                system.Name = latestSystemInfo.Name;
                system.Traffic = latestSystemInfo.Traffic;
                system.Population = latestSystemInfo.Population;
                system.Government = latestSystemInfo.Government;
                system.Allegiance = latestSystemInfo.Allegiance;
                system.State = latestSystemInfo.State;
                system.Security = latestSystemInfo.Security;
                system.Economy = latestSystemInfo.Economy;
                system.Power = latestSystemInfo.Power;
                system.PowerState = latestSystemInfo.PowerState;
                system.NeedPermit = latestSystemInfo.NeedPermit;
                system.LastUpdated = latestSystemInfo.LastUpdated;
                system.ChartColor = latestSystemInfo.ChartColor;
                system.TrackedFactions = trackedFactions.Select(tf => new EICSystemFaction()
                {
                    Faction = GetLatestFactionInfo(tf.EDFaction),
                    Influence = Convert.ToDouble(tf.Influence ?? 0),
                    CurrentState = tf.CurrentState,
                    PendingState = tf.PendingState,
                    RecoveringState = tf.RecoveringState,
                    UpdatedBy = tf.UpdateBy,
                    ControllingFaction = tf.ContrllingFaction,
                    LastUpdated = tf.Timestamp
                }).ToList<IEICSystemFaction>();

                systemsToReturn.Add(system);
            }

            return systemsToReturn;
        }

        public IEICSystem GetSystem(string systemName)
        {
            var system = new EICSystem();

            var dbSystem = (from sys in _eicData.EDSystems where sys.Name.Equals(systemName, StringComparison.InvariantCultureIgnoreCase) select sys).FirstOrDefault();
            var latestSystemInfo = GetLatestSystemInfo(dbSystem);
            var trackedFactions = (from tf in dbSystem.Track_SystemFactions
                                   group tf by new { tf.EDSystem, tf.EDFaction } into tf_grp
                                   select tf_grp.OrderByDescending(tf => tf.Timestamp).FirstOrDefault()).ToList();
                        
            system.Name = latestSystemInfo.Name;
            system.Traffic = latestSystemInfo.Traffic;
            system.Population = latestSystemInfo.Population;
            system.Government = latestSystemInfo.Government;
            system.Allegiance = latestSystemInfo.Allegiance;
            system.State = latestSystemInfo.State;
            system.Security = latestSystemInfo.Security;
            system.Economy = latestSystemInfo.Economy;
            system.Power = latestSystemInfo.Power;
            system.PowerState = latestSystemInfo.PowerState;
            system.NeedPermit = latestSystemInfo.NeedPermit;
            system.LastUpdated = latestSystemInfo.LastUpdated;
            system.ChartColor = latestSystemInfo.ChartColor;
            system.TrackedFactions = trackedFactions.Select(tf => new EICSystemFaction()
            {
                Faction = GetLatestFactionInfo(tf.EDFaction),
                Influence = Convert.ToDouble(tf.Influence ?? 0),
                CurrentState = tf.CurrentState,
                PendingState = tf.PendingState,
                RecoveringState = tf.RecoveringState,
                UpdatedBy = tf.UpdateBy,
                ControllingFaction = tf.ContrllingFaction,
                LastUpdated = tf.Timestamp
            }).ToList<IEICSystemFaction>();

            return system;
        }

        private IEICFaction GetLatestFactionInfo(EDFaction dbFaction)
        {
            var fac = (from tf in dbFaction.Track_Factions
                       orderby tf.Timestamp descending
                       select new EICFaction()
                       {
                           Name = tf.EDFaction.Name,
                           ChartColor = tf.EDFaction.ChartColor                           
                       }).FirstOrDefault();

            if (fac == null)
            {
                // No tracking data... just get from faction then.
                fac = new EICFaction()
                {
                    Name = dbFaction.Name,
                    ChartColor = dbFaction.ChartColor
                };
            }

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

            if (sys == null)
            {
                sys = new EICSystem()
                {
                    Name = dbSystem.Name,
                    ChartColor = dbSystem.ChartColor
                };
            }

            return sys;
        }

        private string GetRandomColor()
        {
            var color = String.Format("#{0:X6}", new Random((int)DateTime.UtcNow.Ticks).Next(0x1000000));
            return color;
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
