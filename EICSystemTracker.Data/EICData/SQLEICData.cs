using EICSystemTracker.Contracts.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using EICSystemTracker.Contracts.SystemTracking;

namespace EICSystemTracker.Data.EICData
{
    class SQLEICData : IEICData
    {
        public void AddSystemFactionTracking(IEICSystemFaction systemFaction)
        {
            throw new NotImplementedException();
        }

        public List<IEICFaction> GetAllFactions()
        {
            throw new NotImplementedException();
        }

        public List<IEICSystem> GetAllSystems()
        {
            throw new NotImplementedException();
        }

        public List<IEICSystemFaction> GetLatestEICSystemFactionTracking()
        {
            throw new NotImplementedException();
        }

        #region IDisposable Support
        private bool disposedValue = false; // To detect redundant calls

        protected virtual void Dispose(bool disposing)
        {
            if (!disposedValue)
            {
                if (disposing)
                {
                    // TODO: dispose managed state (managed objects).
                }

                // TODO: free unmanaged resources (unmanaged objects) and override a finalizer below.
                // TODO: set large fields to null.

                disposedValue = true;
            }
        }

        public void Dispose()
        {
            // Do not change this code. Put cleanup code in Dispose(bool disposing) above.
            Dispose(true);
            // TODO: uncomment the following line if the finalizer is overridden above.
            // GC.SuppressFinalize(this);
        }
        #endregion
    }
}
