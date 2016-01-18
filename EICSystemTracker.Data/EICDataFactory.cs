using EICSystemTracker.Contracts.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EICSystemTracker.Data
{
    public class EICDataFactory : IDisposable
    {
        public void Dispose()
        {
            // TODO?
        }

        /// <summary>
        /// Retrieve the apropriate data adapter based on the DataAdapter type passed in.
        /// </summary>
        /// <param name="dataAdapter"></param>
        /// <returns>A data adapter implementing IEICData</returns>
        public IEICData GetDataAdapter(DataAdapter dataAdapter)
        {
            // This will allow for easier switching between data adapters if the application is decided to change source types (Sql, Nosql, Text, etc)
            // The passed in data adapter only needs to implement the IEICData interface.
            switch (dataAdapter)
            {
                case DataAdapter.MySql: return new MySql.MySqlDataAdapter();
                default: return null;
            }
        }
    }
}
