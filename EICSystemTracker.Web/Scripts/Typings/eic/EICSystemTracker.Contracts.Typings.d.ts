/// <reference path="../jquery/jquery.d.ts" />

/*EICSystemTracker.Contracts.IEICSystemTrackerService*/
interface IEICSystemTrackerService{

  /*methods*/
	TrackSystem?(systemFaction:IEICSystem/*IEICSystem*/):JQueryPromise<void>;
	TrackSystemActivity?(activity:IEICSystemActivity/*IEICSystemActivity*/):JQueryPromise<void>;
	GetLatestSystemTrackingData?():JQueryPromise<any>;
	GetSystem?(systemName:string/*String*/):JQueryPromise<IEICSystem>;
	GetFactionNames?():JQueryPromise<any>;
}


/*EICSystemTracker.Contracts.SystemTracking.IEICSystem*/
interface IEICSystem{
  /*properties*/
	Name: string; /*System.String*/
	Traffic: number; /*System.Int32*/
	Population: number; /*System.Int64*/
	Government: string; /*System.String*/
	Allegiance: string; /*System.String*/
	State: string; /*System.String*/
	Security: string; /*System.String*/
	Economy: string; /*System.String*/
	Power: string; /*System.String*/
	PowerState: string; /*System.String*/
	NeedPermit: boolean; /*System.Boolean*/
	LastUpdated: string; /*System.DateTime*/
	ChartColor: string; /*System.String*/
	TrackedFactions: any; /*System.Collections.Generic.List`1[EICSystemTracker.Contracts.SystemTracking.IEICSystemFaction]*/

}


/*EICSystemTracker.Contracts.SystemTracking.IEICSystemActivity*/
interface IEICSystemActivity{
  /*properties*/
	Type: any; /*EICSystemTracker.Contracts.SystemTracking.ActivityType*/
	SystemName: string; /*System.String*/
	Timestamp: string; /*System.DateTime*/
	Cmdr: string; /*System.String*/

}


/*EICSystemTracker.Contracts.SystemTracking.IEICFaction*/
interface IEICFaction{
  /*properties*/
	Name: string; /*System.String*/
	ChartColor: string; /*System.String*/
	Alliance: string; /*System.String*/

}


/*EICSystemTracker.Contracts.SystemTracking.IEICSystemFaction*/
interface IEICSystemFaction{
  /*properties*/
	Faction: IEICFaction; /*EICSystemTracker.Contracts.SystemTracking.IEICFaction*/
	Influence: number; /*System.Double*/
	CurrentState: string; /*System.String*/
	PendingState: string; /*System.String*/
	RecoveringState: string; /*System.String*/
	UpdatedBy: string; /*System.String*/
	ControllingFaction: boolean; /*System.Boolean*/
	LastUpdated: string; /*System.DateTime*/

}


/*EICSystemTracker.Contracts.SystemTracking.SystemActivities.IConflictZone*/
interface IConflictZone extends IEICSystemActivity{
  /*properties*/
	CreditsClaimed: number; /*System.Int32*/

}


/*EICSystemTracker.Contracts.SystemTracking.SystemActivities.IMurderHobo*/
interface IMurderHobo extends IEICSystemActivity{
  /*properties*/
	BountyEarned: number; /*System.Int32*/

}


/*EICSystemTracker.Contracts.SystemTracking.SystemActivities.IPiracy*/
interface IPiracy extends IEICSystemActivity{
  /*properties*/
	ShipsTaken: number; /*System.Int32*/
	TonsSold: number; /*System.Int32*/

}


/*EICSystemTracker.Contracts.SystemTracking.SystemActivities.IBountyHunting*/
interface IBountyHunting extends IEICSystemActivity{
  /*properties*/
	CreditsClaimed: number; /*System.Int32*/

}


/*EICSystemTracker.Contracts.SystemTracking.SystemActivities.IExploration*/
interface IExploration extends IEICSystemActivity{
  /*properties*/
	ValueSold: number; /*System.Int32*/

}


/*EICSystemTracker.Contracts.SystemTracking.SystemActivities.IMissions*/
interface IMissions extends IEICSystemActivity{
  /*properties*/
	NumHigh: number; /*System.Int32*/
	NumMed: number; /*System.Int32*/
	NumLow: number; /*System.Int32*/

}


/*EICSystemTracker.Contracts.SystemTracking.SystemActivities.ITrading*/
interface ITrading extends IEICSystemActivity{
  /*properties*/
	Tonnage: number; /*System.Int32*/

}


/*EICSystemTracker.Contracts.domain.Data.DataAdapters.Query.StoredProcedureConfig*/
interface IStoredProcedureConfig{
  /*properties*/
	ProcedureName: string; /*System.String*/
	Parameters: any; /*System.Collections.Generic.Dictionary`2[System.String,System.Object]*/

}


/*EICSystemTracker.Contracts.Data.IDataAdapter*/
interface IDataAdapter{


}


/*EICSystemTracker.Contracts.Data.IeddbData*/
interface IeddbData{

  /*methods*/
	GetAllSystems?():JQueryPromise<any>;
}


/*EICSystemTracker.Contracts.Data.IEICData*/
interface IEICData{

  /*methods*/
	TrackSystem?(system:IEICSystem/*IEICSystem*/):JQueryPromise<void>;
	TrackSystemActivity?(activity:IEICSystemActivity/*IEICSystemActivity*/):JQueryPromise<void>;
	GetAllSystems?():JQueryPromise<any>;
	GetAllFactionNames?():JQueryPromise<any>;
	GetLatestEICSystemFactionTracking?():JQueryPromise<any>;
	GetSystem?(systemName:string/*String*/):JQueryPromise<IEICSystem>;
}


/*EICSystemTracker.Contracts.Data.DataAdapters.Relational.IRelationalDataAdapter*/
interface IRelationalDataAdapter extends IDataAdapter{

  /*methods*/
	ExecuteNonQueryProcedure?(cfg:IStoredProcedureConfig/*IStoredProcedureConfig*/):JQueryPromise<void>;
	ExecuteProcedure?(cfg:IStoredProcedureConfig/*IStoredProcedureConfig*/):JQueryPromise<any>;
}

