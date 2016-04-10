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
using EICSystemTracker.Contracts.SystemTracking.SystemActivities;
using ActivityType = EICSystemTracker.Contracts.SystemTracking.ActivityType;

namespace EICSystemTracker.Data.EICData
{
    class SQLEICData : IEICData
    {
        private readonly MSSqlEICDataDataContext _eicData;

        private string GetRandomColor()
        {
            var color = String.Format("#{0:X6}", new Random((int)DateTime.UtcNow.Ticks).Next(0x1000000));
            return color;
        }

        #region Activity Tracking Conversion

        private Track_System_Activity ConvertActivityToDbActivity(DateTime timeStamp, EDSystem dbSystem, IBountyHunting bhActivity)
        {
            if (bhActivity == null) { return null; }

            var dbSystemActivity = new Track_System_Activity
            {
                ActivityType = ((int)bhActivity.Type),
                EDSystem = dbSystem,
                CreditsClaimed = bhActivity.CreditsClaimed,
                Timestamp = timeStamp,
                Cmdr = bhActivity.Cmdr
            };

            return dbSystemActivity;
        }

        private Track_System_Activity ConvertActivityToDbActivity(DateTime timeStamp, EDSystem dbSystem, IConflictZone czActivity)
        {
            if (czActivity == null) { return null; }

            var dbSystemActivity = new Track_System_Activity
            {
                ActivityType = ((int)czActivity.Type),
                EDSystem = dbSystem,
                CreditsClaimed = czActivity.CreditsClaimed,
                Timestamp = timeStamp,
                Cmdr = czActivity.Cmdr
            };

            return dbSystemActivity;
        }

        private Track_System_Activity ConvertActivityToDbActivity(DateTime timeStamp, EDSystem dbSystem, IExploration expActivity)
        {
            if (expActivity == null) { return null; }

            var dbSystemActivity = new Track_System_Activity
            {
                ActivityType = ((int)expActivity.Type),
                EDSystem = dbSystem,
                ExploreValueSold = expActivity.ValueSold,
                Timestamp = timeStamp,
                Cmdr = expActivity.Cmdr
            };

            return dbSystemActivity;
        }

        private Track_System_Activity ConvertActivityToDbActivity(DateTime timeStamp, EDSystem dbSystem, IMissions missionActivity)
        {
            if (missionActivity == null) { return null; }

            var dbSystemActivity = new Track_System_Activity
            {
                ActivityType = ((int)missionActivity.Type),
                EDSystem = dbSystem,
                NumHighMissions = missionActivity.NumHigh,
                NumMedMissions = missionActivity.NumMed,
                NumLowMissions = missionActivity.NumLow,
                Timestamp = timeStamp,
                Cmdr = missionActivity.Cmdr
            };

            return dbSystemActivity;
        }

        private Track_System_Activity ConvertActivityToDbActivity(DateTime timeStamp, EDSystem dbSystem, IMurderHobo murderActivity)
        {
            if (murderActivity == null) { return null; }

            var dbSystemActivity = new Track_System_Activity
            {
                ActivityType = ((int)murderActivity.Type),
                EDSystem = dbSystem,
                BountyEarned = murderActivity.BountyEarned,
                Timestamp = timeStamp,
                Cmdr = murderActivity.Cmdr
            };

            return dbSystemActivity;
        }

        private Track_System_Activity ConvertActivityToDbActivity(DateTime timeStamp, EDSystem dbSystem, IPiracy pirateActivity)
        {
            if (pirateActivity == null) { return null; }

            var dbSystemActivity = new Track_System_Activity
            {
                ActivityType = ((int)pirateActivity.Type),
                EDSystem = dbSystem,
                ShipsTaken = pirateActivity.ShipsTaken,
                Tonnage = pirateActivity.TonsSold,
                Timestamp = timeStamp,
                Cmdr = pirateActivity.Cmdr
            };

            return dbSystemActivity;
        }

        private Track_System_Activity ConvertActivityToDbActivity(DateTime timeStamp, EDSystem dbSystem, ITrading tradeActivity)
        {
            if (tradeActivity == null) { return null; }

            var dbSystemActivity = new Track_System_Activity
            {
                ActivityType = ((int)tradeActivity.Type),
                EDSystem = dbSystem,
                Tonnage = tradeActivity.Tonnage,
                Timestamp = timeStamp,
                Cmdr = tradeActivity.Cmdr
            };

            return dbSystemActivity;
        }

        #endregion

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
                tracking.Timestamp = timestamp;

                _eicData.Track_SystemFactions.InsertOnSubmit(tracking);
            }

            _eicData.SubmitChanges();
        }

        public void TrackSystemActivity(IEICSystemActivity activity)
        {
            var timestamp = DateTime.UtcNow;

            // get system
            EDSystem sys = (from s in _eicData.EDSystems where s.Name == activity.SystemName select s).FirstOrDefault();
            // If no system, add it so we have refs to it.
            if (sys == null)
            {
                sys = new EDSystem();
                sys.Name = activity.SystemName;
                sys.ChartColor = GetRandomColor();
                _eicData.EDSystems.InsertOnSubmit(sys);
            }

            Track_System_Activity activityToSubmit = null;
            switch (activity.Type)
            {
                case ActivityType.BountyHunting:
                    activityToSubmit = ConvertActivityToDbActivity(timestamp, sys, activity as IBountyHunting);
                    break;
                case ActivityType.ConflictZone:
                    activityToSubmit = ConvertActivityToDbActivity(timestamp, sys, activity as IConflictZone);
                    break;
                case ActivityType.Exploration:
                    activityToSubmit = ConvertActivityToDbActivity(timestamp, sys, activity as IExploration);
                    break;
                case ActivityType.Missions:
                    activityToSubmit = ConvertActivityToDbActivity(timestamp, sys, activity as IMissions);
                    break;
                case ActivityType.MurderHobo:
                    activityToSubmit = ConvertActivityToDbActivity(timestamp, sys, activity as IMurderHobo);
                    break;
                case ActivityType.Piracy:
                    activityToSubmit = ConvertActivityToDbActivity(timestamp, sys, activity as IPiracy);
                    break;
                case ActivityType.Trade:
                    activityToSubmit = ConvertActivityToDbActivity(timestamp, sys, activity as ITrading);
                    break;
            }

            if (activityToSubmit != null)
            {
                _eicData.Track_System_Activities.InsertOnSubmit(activityToSubmit);
            }

            _eicData.SubmitChanges();
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

        public List<string> GetAllFactionNames()
        {
            return (from f in _eicData.EDFactions select f.Name).ToList<string>();
        }

        public void Dispose()
        {
            // TODO: Dispose this
        }
    }
}
