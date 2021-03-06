﻿using EICSystemTracker.Contracts.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using EICSystemTracker.Contracts.SystemTracking;
using EICSystemTracker.Data.EICDataAdapters.MSSql;
using EICSystemTracker.Contracts.domain.SystemTracking;
using System.Runtime.Caching;
using EICSystemTracker.Contracts.domain.UserData;
using EICSystemTracker.Contracts.SystemTracking.SystemActivities;
using EICSystemTracker.Contracts.UserData;
using EICSystemTracker.Data.DbUtil;
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
            if (string.IsNullOrEmpty(systemName)) { return null; }

            EICSystem system = null;

            var sysFacTracking = _eicData.GetLatestSystemTracking(systemName).ToList();
            if (sysFacTracking.Count <= 0)
            {
                // If there are no systemfactions for specified system, return an empty system object so it doesn't break shit.
                return new EICSystem()
                {
                    Name = systemName,
                    TrackedFactions = new List<IEICSystemFaction>()
                };
            }


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

        public List<IEICSystemFaction> GetFactionHistoryForSystem(string systemName)
        {
            return _eicData.GetFactionHiostoryForSystem(systemName).Select(res => new EICSystemFaction()
            {
                Faction = new EICFaction() { Name = res.Name },
                Influence = Convert.ToDouble(res.Influence ?? 0),
                CurrentState = res.CurrentState,
                PendingState = res.PendingState,
                RecoveringState = res.RecoveringState,
                LastUpdated = res.Timestamp,
                ControllingFaction = res.ContrllingFaction,
                UpdatedBy = res.UpdateBy
            }).ToList<IEICSystemFaction>();
        }

        public void RegisterNewCommander(string cmdrName, string password)
        {
            var existingCmdr =
                (from c in _eicData.Commanders
                 where c.CmdrName.ToLower() == cmdrName.ToLower()
                 select c).FirstOrDefault();
            if (existingCmdr != null)
            {
                throw new Exception(String.Format("The Commander {0} already exists.", cmdrName));
            }

            // First create a new Guid for the user. This will be unique for each user
            Guid userGuid = System.Guid.NewGuid();

            // Hash the password together with our unique userGuid
            string hashedPassword = Security.HashSHA1(password + userGuid.ToString());

            // Add user to database.
            Commander cmdr = new Commander();
            cmdr.CmdrName = cmdrName;
            cmdr.password = hashedPassword;
            cmdr.userGuid = userGuid;

            _eicData.Commanders.InsertOnSubmit(cmdr);
            _eicData.SubmitChanges();
        }

        public ICommander GetCommanderByCmdrNameAndPassword(string cmdrName, string password)
        {
            ICommander cmdr = new Cmdr();

            Commander foundCmdr =
                (from c in _eicData.Commanders
                 where c.CmdrName.ToLower() == cmdrName.ToLower()
                 select c).ToList().FirstOrDefault();

            if (foundCmdr != null)
            {
                // Now we hash the UserGuid from the database with the password we wan't to check
                // In the same way as when we saved it to the database in the first place. (see AddUser() function)
                string hashedPassword = Security.HashSHA1(password + foundCmdr.userGuid);

                // if its correct password the result of the hash is the same as in the database
                if (foundCmdr.password == hashedPassword)
                {
                    // The password is correct
                    cmdr.CommanderName = foundCmdr.CmdrName;
                }
            }

            return cmdr;
        }
    }
}
