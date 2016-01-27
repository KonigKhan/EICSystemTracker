using System;
using EICSystemTracker.Contracts;
using EICSystemTracker.Host.MediaFormatter;
using Newtonsoft.Json;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Web.Http;
using EICSystemTracker.Contracts.domain.SystemTracking;
using EICSystemTracker.Contracts.SystemTracking;
using EICSystemTracker.Service;

namespace EICSystemTracker.Host.api
{
    public class EICSystemTrackerDataController : ApiController
    {
        private readonly IEICSystemTrackerService _systemTrackerService;

        public EICSystemTrackerDataController()
        {
            // for now... later on we will use autofact to inject these dependancies...
            _systemTrackerService = new EICSystemTrackerService();
        }

        [HttpGet]
        public HttpResponseMessage GetLatestEICSystemData()
        {
            var systemFactions = _systemTrackerService.GetLatestSystemTrackingData();

            var json = JsonConvert.SerializeObject(systemFactions);

            HttpResponseMessage response = Request.CreateResponse(System.Net.HttpStatusCode.OK, json, new TextPlainFormatter());
            response.Content.Headers.ContentType = new MediaTypeHeaderValue("application/json");

            return response;
        }

        [HttpPost]
        public HttpResponseMessage UpdateSystemFactionInfo([FromBody]SystemFactionDTO systemFaction)
        {
            var sys = systemFaction.System != null
                ? new EICSystem()
                {
                    Name = systemFaction.System.Name,
                    ControllingFaction = systemFaction.System.ControllingFaction,
                    Traffic = systemFaction.System.Traffic,
                    Population = systemFaction.System.Population,
                    Government = systemFaction.System.Government,
                    Allegiance = systemFaction.System.Allegiance,
                    State = systemFaction.System.State,
                    Security = systemFaction.System.Security,
                    Economy = systemFaction.System.Economy,
                    Power = systemFaction.System.Power,
                    PowerState = systemFaction.System.PowerState,
                    NeedPermit = systemFaction.System.NeedPermit,
                    LastUpdated = DateTime.UtcNow
                } : null;

            var fac = systemFaction.Faction != null
                ? new EICFaction()
                {
                    Name = systemFaction.Faction.Name,
                    Allegiance = systemFaction.Faction.Allegiance
                } : null;

            var sysFac = new EICSystemFaction()
            {
                System = sys,
                Faction = fac,
                Influence = systemFaction.Influence,
                CurrentState = systemFaction.CurrentState,
                PendingState = systemFaction.PendingState,
                RecoveringState = systemFaction.RecoveringState,
                UpdatedBy = systemFaction.UpdatedBy
            };

            _systemTrackerService.UpdateSystemFactionInfo(sysFac);

            HttpResponseMessage response = Request.CreateResponse(System.Net.HttpStatusCode.OK);
            return response;
        }
    }

    public class EICSystemDTO
    {
        public int Id { get; }
        public string Name { get; set; }
        public string ControllingFaction { get; set; }
        public int Traffic { get; set; }
        public int Population { get; set; }
        public string Government { get; set; }
        public string Allegiance { get; set; }
        public string State { get; set; }
        public string Security { get; set; }
        public string Economy { get; set; }
        public string Power { get; set; }
        public string PowerState { get; set; }
        public bool NeedPermit { get; set; }
        public DateTime LastUpdated { get; set; }
    }

    public class EICFactionDTO
    {
        public int Id { get; }
        public string Name { get; set; }
        public string Allegiance { get; set; }
    }

    public class SystemFactionDTO
    {
        public int Id { get; }
        public EICSystemDTO System { get; set; }
        public EICFactionDTO Faction { get; set; }
        public double Influence { get; set; }
        public string CurrentState { get; set; }
        public string PendingState { get; set; }
        public string RecoveringState { get; set; }
        public string UpdatedBy { get; set; }
    }
}