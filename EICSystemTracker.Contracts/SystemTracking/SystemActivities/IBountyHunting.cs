﻿namespace EICSystemTracker.Contracts.SystemTracking.SystemActivities
{
    public interface IBountyHunting : IEICSystemActivity
    {
        int CreditsClaimed { get; set; }
    }
}
