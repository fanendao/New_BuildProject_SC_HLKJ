using System;
using System.Collections.Generic;
using System.Text;
using System.Data;
using System.Data.Common;
using System.Data.SqlClient;
using IT.Logistics.CommonComponent.Data;

namespace SqlDataAccess.Common
{
    public class ExecPocedure : DataAccessBase
    {
        /// ִ�д洢����_����DataSet(������) 
        /// <summary>
        /// ִ�д洢����_����DataSet(������)  
        /// </summary>
        /// <param name="PocedureName">�洢������</param>
        /// <param name="Parameters">�洢���̲���</param>
        /// <returns>DataSet</returns>
        public DataSet ds_Pocedure(string PocedureName, string Parameters)
        {
            StringBuilder sql = new StringBuilder();

            sql.AppendFormat("EXEC " + PocedureName + " " + Parameters);
            
            DbCommand cmd = this.GetSqlStringCommand(sql.ToString());
            cmd.CommandTimeout = 0;
            return this.ExecuteDataSet(cmd);
        }

        /// ִ�д洢����_����DataSet(������) 
        /// <summary>
        /// ִ�д洢����_����DataSet(������)  
        /// </summary>
        /// <param name="trans">����</param>
        /// <param name="PocedureName">�洢������</param>
        /// <param name="Parameters">�洢���̲���</param>
        /// <returns>DataSet</returns>
        public DataSet ds_Pocedure(DbTransaction trans, string PocedureName, string Parameters)
        {
            StringBuilder sql = new StringBuilder();

            sql.AppendFormat("EXEC " + PocedureName + " " + Parameters);

            DbCommand cmd = this.GetSqlStringCommand(sql.ToString());
            cmd.CommandTimeout = 0;
            return this.ExecuteDataSet(cmd, trans);
        }

        /// ִ�д洢����_����INT(0:��;1:��.������) 
        /// <summary>
        /// ִ�д洢����_����INT(0:��;1:��.������)  
        /// </summary>
        /// <param name="PocedureName">�洢������</param>
        /// <param name="Parameters">�洢���̲���</param>
        /// <returns>INT</returns>
        public int int_Pocedure(string PocedureName, string Parameters)
        {
            StringBuilder sql = new StringBuilder();

            sql.AppendFormat("EXEC " + PocedureName + " " + Parameters);

            DbCommand cmd = this.GetSqlStringCommand(sql.ToString());
            cmd.CommandTimeout = 0;
            DataSet ds = ExecuteDataSet(cmd);

            if (ds != null && ds.Tables[0].Rows.Count > 0)
            {
                return Convert.ToInt32(ds.Tables[0].Rows[0][0].ToString());
            }
            else
            {
                return 0;
            }
        }

        /// ִ�д洢����_����INT(0:��;1:��.������)  
        /// <summary>
        /// ִ�д洢����_����INT(0:��;1:��.������) 
        /// </summary>
        /// <param name="trans">����</param>
        /// <param name="PocedureName">�洢������</param>
        /// <param name="Parameters">�洢���̲���</param>
        /// <returns>INT</returns>
        public int int_Pocedure(DbTransaction trans, string PocedureName, string Parameters)
        {
            StringBuilder sql = new StringBuilder();

            sql.AppendFormat("EXEC " + PocedureName + " " + Parameters);

            DbCommand cmd = this.GetSqlStringCommand(sql.ToString());
            cmd.CommandTimeout = 0;
            DataSet ds = ExecuteDataSet(cmd, trans);

            if (ds != null && ds.Tables[0].Rows.Count > 0)
            {
                return Convert.ToInt32(ds.Tables[0].Rows[0][0].ToString());
            }
            else
            {
                return 0;
            }
        }

        /// ִ�д洢����_����string(0:��;1:��.������) 
        /// <summary>
        /// ִ�д洢����_����string(0:��;1:��.������)  
        /// </summary>
        /// <param name="PocedureName">�洢������</param>
        /// <param name="Parameters">�洢���̲���</param>
        /// <returns>string</returns>
        public string str_Pocedure(string PocedureName, string Parameters)
        {
            StringBuilder sql = new StringBuilder();

            sql.AppendFormat("EXEC " + PocedureName + " " + Parameters);

            DbCommand cmd = this.GetSqlStringCommand(sql.ToString());
            cmd.CommandTimeout = 0;
            DataSet ds = ExecuteDataSet(cmd);

            if (ds != null && ds.Tables[0].Rows.Count > 0)
            {
                return ds.Tables[0].Rows[0][0].ToString();
            }
            else
            {
                return "������";
            }
        }

        /// ִ�д洢����_����string(0:��;1:��.������) 
        /// <summary>
        /// ִ�д洢����_����string(0:��;1:��.������) 
        /// </summary>
        /// <param name="trans">����</param>
        /// <param name="PocedureName">�洢������</param>
        /// <param name="Parameters">�洢���̲���</param>
        /// <returns>string</returns>
        public string str_Pocedure(DbTransaction trans, string PocedureName, string Parameters)
        {
            StringBuilder sql = new StringBuilder();

            sql.AppendFormat("EXEC " + PocedureName + " " + Parameters);

            DbCommand cmd = this.GetSqlStringCommand(sql.ToString());
            cmd.CommandTimeout = 0;
            DataSet ds = ExecuteDataSet(cmd, trans);

            if (ds != null && ds.Tables[0].Rows.Count > 0)
            {
                return ds.Tables[0].Rows[0][0].ToString();
            }
            else
            {
                return "������";
            }
        }
    }
}
