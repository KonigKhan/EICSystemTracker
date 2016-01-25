using System;
using System.Data;
using EICSystemTracker.Contracts.Data.DataAdapters.Query;
using EICSystemTracker.Contracts.Data.DataAdapters.Relational;
using MySql.Data.MySqlClient;

namespace EICSystemTracker.Data.EICDataAdapters
{
    public class MySqlEICDataAdapter : IRelationalDataAdapter
    {
        private readonly MySqlConnection _connection;

        public MySqlEICDataAdapter(string connectionString)
        {
            _connection = new MySqlConnection(connectionString);
        }

        //open connection to database
        private bool OpenConnection()
        {
            _connection.Open();
            return true;
        }

        //Close connection
        private bool CloseConnection()
        {
            _connection.Close();
            return true;
        }

        //Stored Procedure
        public void ExecuteNonQueryProcedure(IStoredProcedureConfig cfg)
        {
            if (this.OpenConnection() == true)
            {
                using (MySqlCommand cmd = new MySqlCommand())
                {
                    cmd.Connection = _connection;
                    cmd.CommandText = cfg.ProcedureName;
                    cmd.CommandType = System.Data.CommandType.StoredProcedure;

                    // Loop through all parms in dictionary.
                    // Add as inbound parameters.
                    foreach (var param in cfg.Parameters)
                    {
                        cmd.Parameters.AddWithValue(param.Key, param.Value);
                        cmd.Parameters[param.Key].Direction = System.Data.ParameterDirection.Input;
                    }

                    // procedure execution.
                    cmd.ExecuteNonQuery();
                    this.CloseConnection();
                }
            }
        }

        public DataTable ExecuteProcedure(IStoredProcedureConfig cfg)
        {
            if (this.OpenConnection() == true)
            {
                var rtnTbl = new DataTable();
                using (MySqlCommand cmd = new MySqlCommand())
                {
                    cmd.Connection = _connection;
                    cmd.CommandText = cfg.ProcedureName;
                    cmd.CommandType = System.Data.CommandType.StoredProcedure;

                    // Loop through all parms in dictionary.
                    // Add as inbound parameters.
                    foreach (var param in cfg.Parameters)
                    {
                        cmd.Parameters.AddWithValue(param.Key, param.Value);
                        cmd.Parameters[param.Key].Direction = System.Data.ParameterDirection.Input;
                    }

                    // procedure execution.
                    using (MySqlDataReader rdr = cmd.ExecuteReader())
                        rtnTbl.Load(rdr);

                    this.CloseConnection();
                }

                return rtnTbl;
            }

            return null;
        }

        public void Dispose()
        {
            if (_connection.State != System.Data.ConnectionState.Closed)
                _connection.Close();
        }
    }
}
