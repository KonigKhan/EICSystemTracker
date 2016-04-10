using System;
using EICSystemTracker.Contracts.SystemTracking;
using EICSystemTracker.Contracts.SystemTracking.SystemActivities;

namespace EICSystemTracker.Host.DTO
{
    public class EICSystemActivityDTO
    {
        public ActivityType Type { get; set; }
        public string SystemName { get; set; }
        public DateTime Timestamp { get; set; }
        public string Cmdr { get; set; }
        public int CreditsClaimed { get; set; }
        public int ValueSold { get; set; }
        public int NumHigh { get; set; }
        public int NumMed { get; set; }
        public int NumLow { get; set; }
        public int BountyEarned { get; set; }
        public int ShipsTaken { get; set; }
        public int TonsSold { get; set; }
        public int Tonnage { get; set; }
    }
}