using EICSystemTracker.Contracts;
using EICSystemTracker.Host.MediaFormatter;
using Newtonsoft.Json;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Web.Http;
using EICSystemTracker.Contracts.domain.SystemTracking;
using EICSystemTracker.Contracts.SystemTracking;
using EICSystemTracker.Service;
using System.Collections.Generic;
using System.Linq;
using EICSystemTracker.Host.DTO;

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

        [HttpGet]
        public HttpResponseMessage GetSystem(string systemName)
        {
            var system = _systemTrackerService.GetSystem(systemName);
            var json = JsonConvert.SerializeObject(system);

            HttpResponseMessage response = Request.CreateResponse(System.Net.HttpStatusCode.OK, json, new TextPlainFormatter());
            response.Content.Headers.ContentType = new MediaTypeHeaderValue("application/json");

            return response;
        }

        [HttpGet]
        public HttpResponseMessage GetCmdrCurrentSystem()
        {
            var json = string.Empty;
            if (!string.IsNullOrWhiteSpace(Util.StaticProperties.ClientCurrentSystemName))
            {
                var system = _systemTrackerService.GetSystem(Util.StaticProperties.ClientCurrentSystemName);
                json = JsonConvert.SerializeObject(system);
            }

            HttpResponseMessage response = Request.CreateResponse(System.Net.HttpStatusCode.OK, json, new TextPlainFormatter());
            response.Content.Headers.ContentType = new MediaTypeHeaderValue("application/json");

            return response;
        }

        [HttpPost]
        public string UpdateSystemFactionInfo([FromBody]EICSystemDTO system)
        {
            var sys = new EICSystem()
            {
                Name = system.Name,
                Allegiance = system.Allegiance,
                Economy = system.Economy,
                Government = system.Government,
                NeedPermit = system.NeedPermit,
                Population = system.Population,
                Power = system.Power,
                PowerState = system.PowerState,
                Security = system.Security,
                State = system.State,
                Traffic = system.Traffic,
                LastUpdated = system.LastUpdated,
                TrackedFactions = system.TrackedFactions == null
                    ? new List<IEICSystemFaction>()
                    : system.TrackedFactions.Select(tf => new EICSystemFaction()
                    {
                        Faction = new EICFaction()
                        {
                            Name = tf.Faction.Name
                        },
                        Influence = tf.Influence,
                        CurrentState = tf.CurrentState,
                        PendingState = tf.PendingState,
                        RecoveringState = tf.RecoveringState,
                        UpdatedBy = tf.UpdatedBy
                    }).ToList<IEICSystemFaction>()
            };

            _systemTrackerService.TrackSystem(sys);

            //HttpResponseMessage response = Request.CreateResponse(System.Net.HttpStatusCode., "", new TextPlainFormatter());
            //response.Content.Headers.ContentType = new MediaTypeHeaderValue("application/json");

            return "OK";
        }

        [HttpPost]
        public string TrackSystemActivity([FromBody] EICSystemActivityDTO activity)
        {
            switch ((ActivityType)activity.Type)
            {
                case ActivityType.BountyHunting:
                    _systemTrackerService.TrackSystemActivity(DTOConversions.ToIBountyHunting(activity));
                    break;
                case ActivityType.ConflictZone:
                    _systemTrackerService.TrackSystemActivity(DTOConversions.ToIConflictZone(activity));
                    break;
                case ActivityType.Exploration:
                    _systemTrackerService.TrackSystemActivity(DTOConversions.ToIExploration(activity));
                    break;
                case ActivityType.Missions:
                    _systemTrackerService.TrackSystemActivity(DTOConversions.ToIMissions(activity));
                    break;
                case ActivityType.MurderHobo:
                    _systemTrackerService.TrackSystemActivity(DTOConversions.ToIMurderHobo(activity));
                    break;
                case ActivityType.Piracy:
                    _systemTrackerService.TrackSystemActivity(DTOConversions.ToIPiracy(activity));
                    break;
                case ActivityType.Trade:
                    _systemTrackerService.TrackSystemActivity(DTOConversions.ToITrading(activity));
                    break;
            }

            return "OK";
        }
    }
}