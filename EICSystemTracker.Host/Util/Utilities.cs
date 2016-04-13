﻿using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Sockets;
using System.Text;
using System.Threading.Tasks;

namespace EICSystemTracker.Host.Util
{
    public static class Utilities
    {
        /// <summary>
        /// Returns all available Uri addresses hostable from this machine within the provided port.
        /// </summary>
        /// <param name="port"></param>
        /// <returns></returns>
        public static Uri[] GetUriParams(int port)
        {
            var uriParams = new List<Uri>();
            string hostName = Dns.GetHostName();

            // Host name URI
            string hostNameUri = string.Format("http://{0}:{1}", Dns.GetHostName(), port);
            uriParams.Add(new Uri(hostNameUri));



            // Host address URI(s)
            var hostEntry = Dns.GetHostEntry(hostName);
            foreach (var ipAddress in hostEntry.AddressList)
            {
                if (ipAddress.AddressFamily == AddressFamily.InterNetwork)  // IPv4 addresses only
                {
                    var addrBytes = ipAddress.GetAddressBytes();
                    string hostAddressUri = string.Format("http://{0}.{1}.{2}.{3}:{4}", addrBytes[0], addrBytes[1], addrBytes[2], addrBytes[3], port);
                    uriParams.Add(new Uri(hostAddressUri));
                }
            }



            // Localhost URI
            uriParams.Add(new Uri(string.Format("http://localhost:{0}", port)));
            return uriParams.ToArray();
        }

        public static string GetNetLogPath()
        {
            // Check if there is an override in the configuration.
            if (!string.IsNullOrEmpty(StaticProperties.UserConfig.EliteDangerousNetLogPath)) { return StaticProperties.UserConfig.EliteDangerousNetLogPath; }

            // Get Launcher Default Path...
            if (Directory.Exists(Constants.LAUNCHER_NETLOG_PATH)) { return Constants.LAUNCHER_NETLOG_PATH; }

            // Get Launcher Appdata Path
            var netLogAppDataPath = Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.LocalApplicationData), Constants.LAUNCHER_APPDATA_NETLOG_RELATIVEPATH);
            if (Directory.Exists(netLogAppDataPath)) { return netLogAppDataPath; }

            // Get Steam Horizons
            if (Directory.Exists(Constants.HORIZONS_STEAM_NETLOG_PATH)) { return Constants.HORIZONS_STEAM_NETLOG_PATH; }

            // Get Steam Non Horizons
            if (Directory.Exists(Constants.NONHORIZONS_STEAM_NETLOG_PATH)) { return Constants.NONHORIZONS_STEAM_NETLOG_PATH; }

            return string.Empty;
        }
    }
}
