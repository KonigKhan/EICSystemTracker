/// <reference path="../jquery/jquery.d.ts" />

/*EICSystemTracker.Contracts.IEICSystemTrackerService*/
interface IEICSystemTrackerService{

  /*methods*/
	GetSystems?():JQueryPromise<any>;
	GetLatestSystemTrackingData?():JQueryPromise<any>;
}


/*EICSystemTracker.Contracts.SystemTracking.IEICFaction*/
interface IEICFaction{
  /*properties*/
	Id: number; /*System.Int32*/
	Name: string; /*System.String*/
	Allegiance: string; /*System.String*/

}


/*EICSystemTracker.Contracts.SystemTracking.IEICSystem*/
interface IEICSystem{
  /*properties*/
	Id: number; /*System.Int32*/
	Name: string; /*System.String*/
	ControllingFaction: string; /*System.String*/
	Traffic: number; /*System.Int32*/
	Population: number; /*System.Int32*/
	Government: string; /*System.String*/
	Allegiance: string; /*System.String*/
	State: string; /*System.String*/
	Security: string; /*System.String*/
	Economy: string; /*System.String*/
	Power: string; /*System.String*/
	PowerState: string; /*System.String*/
	NeedPermit: boolean; /*System.Boolean*/
	LastUpdated: string; /*System.DateTime*/

}


/*EICSystemTracker.Contracts.SystemTracking.IEICSystemFaction*/
interface IEICSystemFaction{
  /*properties*/
	Id: number; /*System.Int32*/
	System: IEICSystem; /*EICSystemTracker.Contracts.SystemTracking.IEICSystem*/
	Faction: IEICFaction; /*EICSystemTracker.Contracts.SystemTracking.IEICFaction*/
	Influence: number; /*System.Double*/
	CurrentState: string; /*System.String*/
	PendingState: string; /*System.String*/
	RecoveringState: string; /*System.String*/
	UpdatedBy: string; /*System.String*/

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


/*EICSystemTracker.Contracts.Data.IEICData*/
interface IEICData{

  /*methods*/
	AddSystemFactionTracking?(systemFaction:IEICSystemFaction/*IEICSystemFaction*/):JQueryPromise<void>;
	GetAllSystems?():JQueryPromise<any>;
	GetAllFactions?():JQueryPromise<any>;
	GetLatestEICSystemFactionTracking?():JQueryPromise<any>;
}


/*EICSystemTracker.Contracts.Data.DataAdapters.Relational.IRelationalDataAdapter*/
interface IRelationalDataAdapter extends IDataAdapter{

  /*methods*/
	ExecuteNonQueryProcedure?(cfg:IStoredProcedureConfig/*IStoredProcedureConfig*/):JQueryPromise<void>;
	ExecuteProcedure?(cfg:IStoredProcedureConfig/*IStoredProcedureConfig*/):JQueryPromise<any>;
}

