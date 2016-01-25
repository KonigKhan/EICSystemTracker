using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using EICSystemTracker.Contracts.domain.SystemTracking;
using EICSystemTracker.Contracts.Data;
using EICSystemTracker.Contracts.SystemTracking;
using Newtonsoft.Json;
using FileInfo = Alphaleonis.Win32.Filesystem.FileInfo;
using Path = Alphaleonis.Win32.Filesystem.Path;

namespace EICSystemTracker.Data.EliteDangerousApiData
{
    public class EddbDataDTO
    {
        public string id { get; set; }
        public string name { get; set; }
        public string x { get; set; }
        public string y { get; set; }
        public string z { get; set; }
        public string faction { get; set; }
        public string population { get; set; }
        public string government { get; set; }
        public string allegiance { get; set; }
        public string state { get; set; }
        public string security { get; set; }
        public string primary_economy { get; set; }
        public string power { get; set; }
        public string power_state { get; set; }
        public string needs_permit { get; set; }
        public string updated_at { get; set; }
        public string simbad_ref { get; set; }
    }

    public class EddbData : IEICData
    {
        private readonly Uri _eddbSystemApiAddress = new Uri("https://eddb.io/archive/v4/systems.json");
        private readonly string _eddbLocalCacheFileName = "";

        public EddbData()
        {

        }

        public List<IEICSystem> GetAllSystems()
        {
            return this.GetSystemsFromApi(false).Select(dto => new EICSystem()
            {
                Name = dto.name,
                ControllingFaction = null,
                Population = int.Parse(dto.population),
                Government = dto.government,
                Allegiance = dto.allegiance,
                State = dto.state,
                Security = dto.security,
                Economy = dto.primary_economy,
                Power = dto.power,
                PowerState = dto.power_state,
                NeedPermit = bool.Parse(dto.needs_permit),
                LastUpdated = Convert.ToDateTime(dto.updated_at)
            }).ToList<IEICSystem>();
        }

        public List<IEICFaction> GetAllFactions()
        {
            throw new System.NotImplementedException();
        }

        #region Not Implemented
        public void AddSystemFactionTracking(IEICSystemFaction systemFaction)
        {
            throw new System.NotImplementedException();
        }
        public List<IEICSystemFaction> GetLatestEICSystemFactionTracking()
        {
            throw new NotImplementedException();
        }
        #endregion

        public void Dispose()
        {
            throw new System.NotImplementedException();
        }

        private List<EddbDataDTO> GetSystemsFromApi(bool resetLocalCache)
        {
            var systems = new List<EddbDataDTO>();

            var localFile = new FileInfo(Path.Combine(Environment.CurrentDirectory, _eddbLocalCacheFileName));
            if (!resetLocalCache && localFile.Exists)
            {
                using (StreamReader r = new StreamReader(localFile.FullName))
                {
                    string json = r.ReadToEnd();
                    systems = JsonConvert.DeserializeObject<List<EddbDataDTO>>(json);
                }
            }
            else
            {
                using (WebClient wc = new WebClient())
                {
                    var json = wc.DownloadString(_eddbSystemApiAddress.AbsoluteUri);
                    systems = JsonConvert.DeserializeObject<List<EddbDataDTO>>(json);

                    // save to local file.
                    if (localFile.Exists) { localFile.Delete(true); }

                    using (
                        StreamWriter outputFile =
                            new StreamWriter(Path.Combine(Environment.CurrentDirectory.ToString(), _eddbLocalCacheFileName)))
                    {
                        outputFile.WriteLine(JsonConvert.SerializeObject(systems));
                    }
                }
            }

            return systems;
        }
    }
}