using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace EICSystemTracker.Host.EliteDangerous
{
    /// <summary>
    /// Stolen from Regulated Noise
    /// </summary>
    public class EdLogWatcher
    {
        public delegate void EventHandler(object sender, EventArgs args);
        public event EventHandler<EdLogLineSystemArgs> ClientArrivedtoNewSystem = delegate { };

        private BackgroundWorker _edLogWatcherBackgroundWorker = new BackgroundWorker();
        private readonly FileSystemWatcher _logfileWatcher = new FileSystemWatcher();
        private string logPath;

        public EdLogWatcher()
        {
            _edLogWatcherBackgroundWorker.WorkerSupportsCancellation = true;
        }

        public void Initialize()
        {
            _edLogWatcherBackgroundWorker.DoWork += _edLogWatcherBackgroundWorker_DoWork;

            // Set LogPath so it's not empty at start.
            var newestLog = getNewestLogFile();
            if (!string.IsNullOrEmpty(newestLog))
            {
                logPath = Path.Combine(Util.Utilities.GetNetLogPath(), newestLog);
                Console.Write("Netlog found: {0}", logPath);
                scanLogfileforLastVisitedSystem(logPath);
            }
            else
            {
                Console.WriteLine("Could not find netlog.");
            }

            //Watch directory to always have the newest logfile
            _logfileWatcher.Path = Util.Utilities.GetNetLogPath();
            _logfileWatcher.Filter = "netLog*.log";
            _logfileWatcher.NotifyFilter = NotifyFilters.LastWrite;
            _logfileWatcher.Changed += updateLogPath;
            _logfileWatcher.EnableRaisingEvents = true;
        }

        #region Log File Methods
        private void updateLogPath(object sender, FileSystemEventArgs e)
        {
            if (e.FullPath == logPath) { return; } //already subscribed logfile is being updated, ignore

            logPath = e.FullPath;

            //Reset backgroundworker
            StopWatcher();
            while (_edLogWatcherBackgroundWorker.IsBusy)
            { }
            StartWatcher();
        }

        private void scanLogfileforLastVisitedSystem(string path)
        {
            //Read logfile from bottom to top
            if (path == null) return;
            using (var fs = new FileStream(path, FileMode.Open, FileAccess.Read, FileShare.ReadWrite))
            {
                foreach (var s in ReadLineReverse(fs, 1))
                {
                    var line = s.Replace("\n", string.Empty).Replace("\r", string.Empty);
                    var logline = new EdLogLine(line);
                    if (logline.isSystem)
                    {
                        ClientArrivedtoNewSystem(this, new EdLogLineSystemArgs(logline.SystemName));
                        return;
                    }
                }
            }

        }

        static IEnumerable<string> ReadLineReverse(Stream fs, long validpos)
        {
            //Apparently theres no good way to read a file backwards, due to how files and disks are designed.
            //http://ali.shiravi.com/299

            const int BUFLEN = 100000000;
            var filelen = fs.Length;
            byte[] buffer = new byte[BUFLEN];
            long pos = BUFLEN;
            if (pos > filelen - validpos + 1) pos = filelen - validpos + 1;
            byte[] midbuffer = new byte[100000];
            int mindex = midbuffer.Length;
            while (true)
            {
                fs.Seek(-pos, SeekOrigin.End);
                int readbytes = fs.Read(buffer, 0, BUFLEN);

                for (int i = readbytes - 1; i >= 0; i--)
                {
                    midbuffer[--mindex] = buffer[i];
                    if (buffer[i] == 10)
                    {
                        string s = System.Text.Encoding.ASCII.GetString(midbuffer, mindex, midbuffer.Length - mindex);
                        yield return s;
                        mindex = midbuffer.Length;
                    }
                }

                pos += BUFLEN;
                if (pos > filelen - validpos + 1) pos = filelen - validpos + 1;

                if (readbytes < BUFLEN) break;
            }
            if (mindex < midbuffer.Length)
                yield return System.Text.Encoding.ASCII.GetString(midbuffer, mindex, midbuffer.Length - mindex);
        }

        private string getNewestLogFile()
        {
            var path = Util.Utilities.GetNetLogPath();

            if (!Directory.EnumerateFiles(path).Any(f => f.Contains("netLog"))) { return null; } //No Logfiles
            var netLog = Directory.GetFiles(path, "netLog*.log").OrderByDescending(File.GetLastWriteTime).ToArray()[0];
            return netLog;
        }
        #endregion

        #region BackgroundWorker
        private void _edLogWatcherBackgroundWorker_DoWork(object sender, DoWorkEventArgs e)
        {
            if (logPath == null) return;
            using (var fs = new FileStream(logPath, FileMode.Open, FileAccess.Read, FileShare.ReadWrite))
            using (var reader = new StreamReader(fs))
            {
                reader.BaseStream.Seek(0, SeekOrigin.End);
                do
                {
                    if (_edLogWatcherBackgroundWorker.CancellationPending) e.Cancel = true;
                    var line = reader.ReadLine();
                    if (!String.IsNullOrWhiteSpace(line))
                    {
                        var logline = new EdLogLine(line);
                        if (logline.isSystem)
                        {
                            ClientArrivedtoNewSystem(this, new EdLogLineSystemArgs(logline.SystemName));
                        }
                    }
                    else
                        Thread.Sleep(5000);

                } while (!e.Cancel);
            }
        }

        public void StartWatcher()
        {
            _edLogWatcherBackgroundWorker.RunWorkerAsync();
        }

        public void StopWatcher()
        {
            _edLogWatcherBackgroundWorker.CancelAsync();
        }
        #endregion
    }
}
