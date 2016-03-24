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
        /// <summary>
        /// Retrieve the apropriate data adapter based on the DataAdapter type passed in.
        /// </summary>
        /// <param name="dataAdapterType"></param>
        /// <returns>A data adapter implementing IEICData</returns>
        public static IEICData GetDataAdapter(DataAdapterType dataAdapterType)
        {
            // This will allow for easier switching between data adapters if the application is decided to change source types (Sql, Nosql, Text, etc)
            // The passed in data adapter only needs to implement the IEICData interface.

            //builder.DataSource = "";
            //builder.InitialCatalog = "EICData";
            //builder.UserID = "admin";
            //builder.Password = "Wur3rat6";

            switch (dataAdapterType)
            {
                case DataAdapterType.MySql: return new EICData.MySqlEICData("[SERVER]", "[DB]", "[USER]", "[PWD]");
                case DataAdapterType.MSSql: return new EICData.SQLEICData(server: "pumknnutzsql.cdoiaf2cq4xx.us-west-2.rds.amazonaws.com", 
                                                                          dataBase: "EICData", 
                                                                          userName: "admin", 
                                                                          password: "Wur3rat6");
                default: return null;
            }
        }

        public void Dispose()
        {
            // TODO?
        }
    }
}
