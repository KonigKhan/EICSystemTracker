using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EICSystemTracker.Host.Util
{
    public class Constants
    {
        // Elite Dangerous Configuration files and Logs paths.
        // Provided by https://support.frontier.co.uk/kb/faq.php?id=108
        // ///////////////////////////////////////////

        #region Launcher Default Install Location
        public const string LAUNCHER_NETLOG_PATH = @"C:\Program Files (x86)\Frontier\Products\elite-dangerous-64\logs\";
        public const string LAUNCHER_APPCONFIG_PATH = @"C:\Program Files (x86)\Frontier\Products\elite-dangerous-64\AppConfig.xml";
        public const string LAUNCHER_GAMEFOLDER_PATH = @"C:\Program Files (x86)\Frontier\Products\";
        #endregion

        #region Launcher Appdata Install Location
        public const string LAUNCHER_APPDATA_NETLOG_RELATIVEPATH = @"Local\Frontier Developments\Products\elite-dangerous-64\logs\";
        public const string LAUNCHER_APPDATA_APPCONFIG_RELATIVEPATH = @"Local\Frontier_Developments\Products\elite-dangerous-64\AppConfig.xml";
        public const string LAUNCHER_APPDATA_GAMEFOLDER_RELATIVEPATH = @"\Local\Frontier_Developments\";
        #endregion

        #region Steam Non-Horizons Install Location
        public const string NONHORIZONS_STEAM_NETLOG_PATH = @"C:\Program Files (x86)\Steam\steamapps\common\Elite Dangerous\Products\elite-dangerous-64\Logs\";
        public const string NONHORIZONS_STEAM_APPCONFIG_PATH = @"C:\Program Files (x86)\Steam\steamapps\common\Elite Dangerous\Products\elite-dangerous-64\AppConfig.xml";
        public const string NONHORIZONS_STEAM_GAMEFOLDER_PATH = @"C:\Program Files (x86)\Steam\steamapps\common\Elite Dangerous\";
        #endregion

        #region Steam Horizons Install Location
        public const string HORIZONS_STEAM_NETLOG_PATH = @"C:\Program Files (x86)\Steam\steamapps\common\Elite Dangerous Horizons\Products\elite-dangerous-64\logs\";
        public const string HORIZONS_STEAM_APPCONFIG_PATH = @"C:\Program Files (x86)\Steam\steamapps\common\Elite Dangerous Horizons\Products\elite-dangerous-64\AppConfig.xml";
        public const string HORIZONS_STEAM_GAMEFOLDER_PATH = @"C:\Program Files (x86)\Steam\steamapps\common\Elite Dangerous Horizons\";
        #endregion

        public const string USER_CONFIG_RELATIVE_PATH = @"UserConfig.json";
    }
}