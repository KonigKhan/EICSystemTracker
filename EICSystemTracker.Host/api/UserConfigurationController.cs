using System.Net.Http;
using System.Net.Http.Headers;
using System.Web.Http;
using EICSystemTracker.Host.DTO;
using EICSystemTracker.Host.MediaFormatter;
using EICSystemTracker.Host.Util;
using EICSystemTracker.Service;
using Nancy;
using Newtonsoft.Json;

namespace EICSystemTracker.Host.api
{
    public class UserConfigurationController : ApiController
    {
        private EICSystemTrackerService _systemTrackerService;

        public UserConfigurationController()
        {
            // for now... later on we will use autofact to inject these dependancies...
            _systemTrackerService = new EICSystemTrackerService();
        }

        [HttpGet]
        public HttpResponseMessage GetSavedSettings()
        {
            var json = JsonConvert.SerializeObject(StaticProperties.UserConfig);

            HttpResponseMessage response = Request.CreateResponse(System.Net.HttpStatusCode.OK, json, new TextPlainFormatter());
            response.Content.Headers.ContentType = new MediaTypeHeaderValue("application/json");

            return response;
        }

        [HttpPost]
        public string SaveSettings([FromBody]EICUserConfigDTO config)
        {
            var cfg = DTOConversions.ToEicSystemTrackerConfig(config);
            StaticProperties.UserConfig = cfg as EICSystemTrackerConfig;
            Utilities.SaveConfig();

            return "OK";
        }

        [HttpPost]
        public string RegisterNewCommander([FromBody] CmdrAuthDTO cmdr)
        {
            _systemTrackerService.RegisterNewCommander(cmdr.CommanderName, cmdr.Password);
            return "OK";
        }

        [HttpPost]
        public string CmdrLogIn([FromBody] CmdrAuthDTO cmdr)
        {
            var res = _systemTrackerService.GetCommanderByCmdrNameAndPassword(cmdr.CommanderName, cmdr.Password);
            if (!string.IsNullOrEmpty(res.CommanderName))
            {
                return "OK";
            }

            return "Could not find cmdr " + cmdr.CommanderName;
        }
    }
}