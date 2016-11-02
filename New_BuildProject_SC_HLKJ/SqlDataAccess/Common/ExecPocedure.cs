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
        /// 执行存储过程_返回DataSet(无事务) 
        /// <summary>
        /// 执行存储过程_返回DataSet(无事务)  
        /// </summary>
        /// <param name="PocedureName">存储过程名</param>
        /// <param name="Parameters">存储过程参数</param>
        /// <returns>DataSet</returns>
        public DataSet ds_Pocedure(string PocedureName, string Parameters)
        {
            StringBuilder sql = new StringBuilder();

            sql.AppendFormat("EXEC " + PocedureName + " " + Parameters);
            
            DbCommand cmd = this.GetSqlStringCommand(sql.ToString());
            cmd.CommandTimeout = 0;
            return this.ExecuteDataSet(cmd);
        }

        /// 执行存储过程_返回DataSet(有事务) 
        /// <summary>
        /// 执行存储过程_返回DataSet(有事务)  
        /// </summary>
        /// <param name="trans">事务</param>
        /// <param name="PocedureName">存储过程名</param>
        /// <param name="Parameters">存储过程参数</param>
        /// <returns>DataSet</returns>
        public DataSet ds_Pocedure(DbTransaction trans, string PocedureName, string Parameters)
        {
            StringBuilder sql = new StringBuilder();

            sql.AppendFormat("EXEC " + PocedureName + " " + Parameters);

            DbCommand cmd = this.GetSqlStringCommand(sql.ToString());
            cmd.CommandTimeout = 0;
            return this.ExecuteDataSet(cmd, trans);
        }

        /// 执行存储过程_返回INT(0:假;1:真.无事务) 
        /// <summary>
        /// 执行存储过程_返回INT(0:假;1:真.无事务)  
        /// </summary>
        /// <param name="PocedureName">存储过程名</param>
        /// <param name="Parameters">存储过程参数</param>
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

        /// 执行存储过程_返回INT(0:假;1:真.有事务)  
        /// <summary>
        /// 执行存储过程_返回INT(0:假;1:真.有事务) 
        /// </summary>
        /// <param name="trans">事务</param>
        /// <param name="PocedureName">存储过程名</param>
        /// <param name="Parameters">存储过程参数</param>
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

        /// 执行存储过程_返回string(0:假;1:真.无事务) 
        /// <summary>
        /// 执行存储过程_返回string(0:假;1:真.无事务)  
        /// </summary>
        /// <param name="PocedureName">存储过程名</param>
        /// <param name="Parameters">存储过程参数</param>
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
                return "无数据";
            }
        }

        /// 执行存储过程_返回string(0:假;1:真.有事务) 
        /// <summary>
        /// 执行存储过程_返回string(0:假;1:真.有事务) 
        /// </summary>
        /// <param name="trans">事务</param>
        /// <param name="PocedureName">存储过程名</param>
        /// <param name="Parameters">存储过程参数</param>
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
                return "无数据";
            }
        }
    }
}
