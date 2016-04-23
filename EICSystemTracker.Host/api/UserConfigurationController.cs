using System.Net.Http;
using System.Net.Http.Headers;
using System.Web.Http;
using EICSystemTracker.Host.DTO;
using EICSystemTracker.Host.MediaFormatter;
using EICSystemTracker.Host.Util;
using Nancy;
using Newtonsoft.Json;

namespace EICSystemTracker.Host.api
{
    public class UserConfigurationController : ApiController
    {
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
    }
}