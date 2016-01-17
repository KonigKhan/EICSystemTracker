/// <reference path="../jquery/jquery.d.ts" />

/*EICSystemTracker.Contracts.SystemTracking.IEICFaction*/
interface IEICFaction{


}


/*EICSystemTracker.Contracts.SystemTracking.IEICSystem*/
interface IEICSystem{


}


/*EICSystemTracker.Contracts.SystemTracking.IEICSystemFaction*/
interface IEICSystemFaction{
  /*properties*/
	EICSystem: IEICSystem; /*EICSystemTracker.Contracts.SystemTracking.IEICSystem*/
	EICFaction: IEICFaction; /*EICSystemTracker.Contracts.SystemTracking.IEICFaction*/

}

