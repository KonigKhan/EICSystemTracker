using EICSystemTracker.Contracts.domain.SystemTracking.SystemActivities;
using EICSystemTracker.Contracts.SystemTracking;
using EICSystemTracker.Contracts.SystemTracking.SystemActivities;

namespace EICSystemTracker.Host.DTO
{
    public class DTOConversions
    {
        public static IBountyHunting ToIBountyHunting(EICSystemActivityDTO activity)
        {
            return new BountyHunting()
            {
                SystemName = activity.SystemName,
                CreditsClaimed = activity.CreditsClaimed,
                Cmdr = activity.Cmdr,
                Timestamp = activity.Timestamp
            };
        }

        public static IConflictZone ToIConflictZone(EICSystemActivityDTO activity)
        {
            return new ConflictZone()
            {
                SystemName = activity.SystemName,
                CreditsClaimed = activity.CreditsClaimed,
                Cmdr = activity.Cmdr,
                Timestamp = activity.Timestamp
            };
        }

        public static IExploration ToIExploration(EICSystemActivityDTO activity)
        {
            return new Exploration()
            {
                SystemName = activity.SystemName,
                Cmdr = activity.Cmdr,
                Timestamp = activity.Timestamp,
                ValueSold = activity.ValueSold
            };
        }

        public static IMissions ToIMissions(EICSystemActivityDTO activity)
        {
            return new Missions()
            {
                SystemName = activity.SystemName,
                Cmdr = activity.Cmdr,
                Timestamp = activity.Timestamp,
                NumHigh = activity.NumHigh,
                NumMed = activity.NumMed,
                NumLow = activity.NumLow
            };
        }

        public static IMurderHobo ToIMurderHobo(EICSystemActivityDTO activity)
        {
            return new MurderHobo()
            {
                SystemName = activity.SystemName,
                Cmdr = activity.Cmdr,
                Timestamp = activity.Timestamp,
                BountyEarned = activity.BountyEarned
            };
        }

        public static IPiracy ToIPiracy(EICSystemActivityDTO activity)
        {
            return new Piracy()
            {
                SystemName = activity.SystemName,
                Cmdr = activity.Cmdr,
                Timestamp = activity.Timestamp,
                ShipsTaken = activity.ShipsTaken,
                TonsSold = activity.TonsSold
            };
        }

        public static ITrading ToITrading(EICSystemActivityDTO activity)
        {
            return new Trading()
            {
                SystemName = activity.SystemName,
                Cmdr = activity.Cmdr,
                Timestamp = activity.Timestamp,
                Tonnage = activity.Tonnage
            };
        }
    }
}