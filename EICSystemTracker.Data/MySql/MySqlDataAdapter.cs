using EICSystemTracker.Contracts.Data;
using EICSystemTracker.Contracts.SystemTracking;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Linq;

namespace EICSystemTracker.Data.MySql
{
    public class MySqlDataAdapter : IEICData
    {
        private MySqlConnection connection;
        private string server;
        private string database;
        private string uid;
        private string password;

        public MySqlDataAdapter()
        {
            Initialize();
        }

        //Initialize values
        private void Initialize()
        {
            // TODO: read from a dat cfg file.
            server = "localhost";
            database = "iller123_eic";
            uid = "root";
            password = "password";
            string connectionString;
            connectionString = "SERVER=" + server + ";" + "DATABASE=" +
            database + ";" + "UID=" + uid + ";" + "PASSWORD=" + password + ";";

            connection = new MySqlConnection(connectionString);
        }

        //open connection to database
        private bool OpenConnection()
        {
            connection.Open();
            return true;
        }

        //Close connection
        private bool CloseConnection()
        {
            connection.Close();
            return true;
        }

        #region IEICData
        public void AddUpdateSystemFaction(IEICSystemFaction systemFaction)
        {
            if (this.OpenConnection() == true)
            {
                using (MySqlCommand cmd = new MySqlCommand())
                {
                    cmd.Connection = connection;
                    cmd.CommandText = "addUpdate_systemfaction";
                    cmd.CommandType = System.Data.CommandType.StoredProcedure;

                    //if (systemFaction.System != null && systemFaction.System.SystemId != -1)
                    //{
                    //    cmd.Parameters.AddWithValue("@setSystemId", systemFaction.System.SystemId);
                    //    cmd.Parameters["@setSystemId"].Direction = System.Data.ParameterDirection.Input;
                    //}
                    //else
                    //{
                    //    cmd.Parameters.AddWithValue("@setSystemId", null);
                    //    cmd.Parameters["@setSystemId"].Direction = System.Data.ParameterDirection.Input;
                    //}

                    //cmd.Parameters.AddWithValue("@setSystemName", systemFaction.System.SystemName);
                    //cmd.Parameters["@setSystemName"].Direction = System.Data.ParameterDirection.Input;

                    //if (systemFaction.Faction != null && systemFaction.Faction.FactionId != -1)
                    //{
                    //    cmd.Parameters.AddWithValue("@setFactionId", systemFaction.Faction.FactionId);
                    //    cmd.Parameters["@setFactionId"].Direction = System.Data.ParameterDirection.Input;
                    //}
                    //else
                    //{
                    //    cmd.Parameters.AddWithValue("@setFactionId", null);
                    //    cmd.Parameters["@setFactionId"].Direction = System.Data.ParameterDirection.Input;
                    //}

                    //cmd.Parameters.AddWithValue("@setFactionname", systemFaction.Faction.FactionName);
                    //cmd.Parameters["@setFactionname"].Direction = System.Data.ParameterDirection.Input;

                    //cmd.Parameters.AddWithValue("@setInfluence", systemFaction.Influence);
                    //cmd.Parameters["@setInfluence"].Direction = System.Data.ParameterDirection.Input;

                    //cmd.Parameters.AddWithValue("@setCurrentState", systemFaction.CurrentState[0].ToString());
                    //cmd.Parameters["@setCurrentState"].Direction = System.Data.ParameterDirection.Input;

                    //cmd.Parameters.AddWithValue("@setPendingState", string.Join(",", systemFaction.PendingState.ToArray()));
                    //cmd.Parameters["@setPendingState"].Direction = System.Data.ParameterDirection.Input;

                    //cmd.Parameters.AddWithValue("@setRecoveringState", string.Join(",", systemFaction.RecoveringState.ToArray()));
                    //cmd.Parameters["@setRecoveringState"].Direction = System.Data.ParameterDirection.Input;

                    //cmd.Parameters.AddWithValue("@setUpdatedBy", systemFaction.UpdatedBy);
                    //cmd.Parameters["@setUpdatedBy"].Direction = System.Data.ParameterDirection.Input;



                    cmd.ExecuteNonQuery();
                    this.CloseConnection();

                }
            }
        }

        public List<IEICSystem> GetAllSystems()
        {


            throw new NotImplementedException();
        }
        #endregion

        public void Dispose()
        {
            if (connection.State != System.Data.ConnectionState.Closed)
                connection.Close();
        }

        public List<IEICFaction> GetAllFactions()
        {
            throw new NotImplementedException();
        }
    }
}
