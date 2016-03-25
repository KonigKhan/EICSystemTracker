using System;
using EICSystemTracker.Contracts.domain.SystemTracking;
using EICSystemTracker.Contracts.Data;
using EICSystemTracker.Contracts.SystemTracking;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace EICSystemTracker.Data.Tests
{
    [TestClass]
    public class EICDataTests
    {
        [TestMethod]
        [Ignore]
        public void addUpdatetracking_mysql_success_test()
        {
            // arrange
            IEICData eicData = EICDataFactory.GetDataAdapter(DataAdapterType.MySql);
            IEICSystemFaction sysFaction = new EICSystemFaction()
            {
                System = new EICSystem()
                {
                    Name = "Kappa Fornacis",
                    Traffic = 30,
                    Population = 7500000,
                    Government = "Corporate",
                    Security = "Medium",
                    Allegiance = "Empire",
                    State = "Expansion",
                    Economy = "Agriculture",
                    Power = "Zemina Torval",
                    PowerState = "Control",
                    NeedPermit = false
                },
                Faction = new EICFaction()
                {
                    Name = "East India Company",
                },
                Influence = 50.6,
                CurrentState = "Expansion",
                PendingState = "Boom, Civil Unrest",
                RecoveringState = "Boom",
                UpdatedBy = "UnitTest"
            };

            // act
            // TODO: Update This
            //eicData.TrackSystem(sysFaction);

            // assert
            // if exception, we fail.
        }

        [TestMethod]
        [Ignore]
        public void gettlatesttracing_mysql_success_test()
        {
            IEICData eicData = EICDataFactory.GetDataAdapter(DataAdapterType.MySql);
            var systemfactiontrackingdata = eicData.GetLatestEICSystemFactionTracking();
        }

        [TestMethod]
        public void addUpdateTracking_mssql_sources_test()
        {
            // arrange
            IEICData eicData = EICDataFactory.GetDataAdapter(DataAdapterType.MSSql);
            IEICSystemFaction sysFaction = new EICSystemFaction()
            {
                System = new EICSystem()
                {
                    Name = "Kappa Fornacis",
                    Traffic = 30,
                    Population = 7500000,
                    Government = "Corporate",
                    Security = "Medium",
                    Allegiance = "Empire",
                    State = "Expansion",
                    Economy = "Agriculture",
                    Power = "Zemina Torval",
                    PowerState = "Control",
                    NeedPermit = false
                },
                Faction = new EICFaction()
                {
                    Name = "East India Company"
                },
                Influence = 50.6,
                CurrentState = "Expansion",
                PendingState = "Boom, Civil Unrest",
                RecoveringState = "Boom",
                UpdatedBy = "UnitTest"
            };

            // act
            // TODO: Update This
            //eicData.TrackSystem(sysFaction);
        }

        [TestMethod]
        public void gettlatesttracing_mssql_success_test()
        {
            IEICData eicData = EICDataFactory.GetDataAdapter(DataAdapterType.MSSql);
            var systemfactiontrackingdata = eicData.GetLatestEICSystemFactionTracking();
        }
    }
}
