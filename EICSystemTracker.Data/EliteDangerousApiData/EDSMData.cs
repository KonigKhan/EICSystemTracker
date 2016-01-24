using System;
using EICSystemTracker.Contracts.SystemTracking;
using System.Collections.Generic;
using System.IO;
using System.Net;
using Newtonsoft.Json;
using FileInfo = Alphaleonis.Win32.Filesystem.FileInfo;

namespace EICSystemTracker.Data.EliteDangerousApiData
{
    public class EDSMSystem
    {
        public string Name { get; set; }
    }

    public class EDSMData
    {
        private readonly string edsmDataFileName = "edsmSystems.json";

        public List<EDSMSystem> GetSystemNames(bool resetLocal)
        {
            List<EDSMSystem> systemNames = new List<EDSMSystem>();

            var localFile = new FileInfo(Path.Combine(Environment.CurrentDirectory, edsmDataFileName));
            if (!resetLocal && localFile.Exists)
            {
                using (StreamReader r = new StreamReader(localFile.FullName))
                {
                    string json = r.ReadToEnd();
                    systemNames = JsonConvert.DeserializeObject<List<EDSMSystem>>(json);
                }
            }
            else
            {
                using (WebClient wc = new WebClient())
                {
                    var json = wc.DownloadString("http://www.edsm.net/api-v1/systems");
                    systemNames = JsonConvert.DeserializeObject<List<EDSMSystem>>(json);

                    // save to local file.
                    if (localFile.Exists) { localFile.Delete(true); }

                    using (
                        StreamWriter outputFile =
                            new StreamWriter(Path.Combine(Environment.CurrentDirectory.ToString(), edsmDataFileName)))
                    {
                        outputFile.WriteLine(JsonConvert.SerializeObject(systemNames));
                    }
                }
            }

            return systemNames;
        }
    }
}