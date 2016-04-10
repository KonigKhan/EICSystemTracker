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

            var sysFacTracking = _eicData.GetLatestSystemTracking(null).ToList();
            foreach (var sysfac in sysFacTracking)
            {
                // Create new sys fac tracking data.
                var trackedSysFaction = new EICSystemFaction()
                {
                    Faction = new EICFaction()
                    {
                        Name = sysfac.FactionName,
                        ChartColor = sysfac.FactionChartColor
                    },
                    Influence = sysfac.Influence == null
                            ? 0.0
                            : Convert.ToDouble(sysfac.Influence),
                    CurrentState = sysfac.CurrentState,
                    PendingState = sysfac.PendingState,
                    RecoveringState = sysfac.RecoveringState,
                    // ControllingFaction = sysfac.ControllingFaction,
                    LastUpdated = sysfac.Timestamp,
                    UpdatedBy = sysfac.UpdateBy
                };

                var existing = systemsToReturn.FirstOrDefault(s => s.Name.Trim().Equals(sysfac.SystemName.Trim(), StringComparison.InvariantCultureIgnoreCase));
                if (existing != null)
                {
                    // add sys faction to system.
                    // check if faction exists in tracked factions.
                    var existingFaction = existing.TrackedFactions.FirstOrDefault(tf => tf.Faction.Name.Trim().Equals(trackedSysFaction.Faction.Name.Trim(), StringComparison.InvariantCultureIgnoreCase));
                    if (existingFaction == null)
                    {
                        existing.TrackedFactions.Add(trackedSysFaction);
                    }
                }
                else
                {
                    // create new system and add faction to it.
                    var newSystem = new EICSystem()
                    {
                        Name = sysfac.SystemName,
                        ChartColor = sysfac.SystemChartColor,
                        Allegiance = sysfac.Allegiance,
                        Economy = sysfac.Economy,
                        Government = sysfac.Government,
                        NeedPermit = sysfac.NeedPermit,
                        Population = sysfac.Population == null
                                        ? 0
                                        : Convert.ToInt64(sysfac.Population),
                        Power = sysfac.ControllingPower,
                        PowerState = sysfac.ControllingPowerState,
                        Security = sysfac.Security,
                        State = sysfac.State,
                        Traffic = sysfac.Traffic == null
                                    ? 0
                                    : Convert.ToInt32(sysfac.Traffic),
                        TrackedFactions = new List<IEICSystemFaction>()
                    };

                    // Add SystemFaction
                    newSystem.TrackedFactions.Add(trackedSysFaction);

                    // Add to systems to return collection
                    systemsToReturn.Add(newSystem);
                }
            }

            return systemsToReturn;
        }

        public IEICSystem GetSystem(string systemName)
        {
            EICSystem system = null;

            var sysFacTracking = _eicData.GetLatestSystemTracking(systemName).ToList();
            foreach (var sysfac in sysFacTracking)
            {
                // Create new sys fac tracking data.
                var trackedSysFaction = new EICSystemFaction()
                {
                    Faction = new EICFaction()
                    {
                        Name = sysfac.FactionName,
                        ChartColor = sysfac.FactionChartColor
                    },
                    Influence = sysfac.Influence == null
                            ? 0.0
                            : Convert.ToDouble(sysfac.Influence),
                    CurrentState = sysfac.CurrentState,
                    PendingState = sysfac.PendingState,
                    RecoveringState = sysfac.RecoveringState,
                    // ControllingFaction = sysfac.ControllingFaction,
                    LastUpdated = sysfac.Timestamp,
                    UpdatedBy = sysfac.UpdateBy
                };

                if (system != null)
                {
                    // add sys faction to system.
                    // check if faction exists in tracked factions.
                    var existingFaction = system.TrackedFactions.FirstOrDefault(tf => tf.Faction.Name.Trim().Equals(trackedSysFaction.Faction.Name.Trim(), StringComparison.InvariantCultureIgnoreCase));
                    if (existingFaction == null)
                    {
                        system.TrackedFactions.Add(trackedSysFaction);
                    }
                }
                else
                {
                    // create new system and add faction to it.
                    system = new EICSystem()
                    {
                        Name = sysfac.SystemName,
                        ChartColor = sysfac.SystemChartColor,
                        Allegiance = sysfac.Allegiance,
                        Economy = sysfac.Economy,
                        Government = sysfac.Government,
                        NeedPermit = sysfac.NeedPermit,
                        Population = sysfac.Population == null
                                        ? 0
                                        : Convert.ToInt64(sysfac.Population),
                        Power = sysfac.ControllingPower,
                        PowerState = sysfac.ControllingPowerState,
                        Security = sysfac.Security,
                        State = sysfac.State,
                        Traffic = sysfac.Traffic == null
                                    ? 0
                                    : Convert.ToInt32(sysfac.Traffic),
                        TrackedFactions = new List<IEICSystemFaction>()
                    };

                    // Add SystemFaction
                    system.TrackedFactions.Add(trackedSysFaction);
                }
            }

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

        public void Dispose()
        {
            // TODO: Dispose this
        }

        // TODO: Add functionality to get all faction names.
        public List<string> GetAllFactionNames()
        {
            throw new NotImplementedException();
        }
    }
}
