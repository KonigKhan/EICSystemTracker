using EICSystemTracker.Contracts;
using EICSystemTracker.Host.MediaFormatter;
using Newtonsoft.Json;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Web.Http;
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
    }
}