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
        public void addUpdatetracking_mysql_success_test()
        {
            // arrange
            IEICData eicData = EICDataFactory.GetDataAdapter(DataAdapterType.MySql);
            IEICSystemFaction sysFaction = new EICSystemFaction()
            {
                System = new EICSystem()
                {
                    Name = "Kappa Fornacis",
                    //Traffic = 30,
                    Population = 1000,
                    Government = "Agriculture",
                    Security = "High",
                    Power = "Troval"
                },
                Faction = new EICFaction()
                {
                    Name = "East India Company",
                    Allegiance = "Empire"
                },
                Influence = 50.6,
                CurrentState = "Expansion",
                PendingState = "Boom, Civil Unrest",
                RecoveringState = "Boom",
                UpdatedBy = "UnitTest"
            };

            // act
            eicData.AddSystemFactionTracking(sysFaction);

            // assert
            // if exception, we fail.
        }
    }
}
