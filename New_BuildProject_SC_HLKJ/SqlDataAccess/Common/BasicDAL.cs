using System;
using System.Collections.Generic;
using System.Text;
using System.Data;
using System.Data.Common;
using System.Data.SqlClient;
using IT.Logistics.CommonComponent.Data;
using System.Configuration;

namespace SqlDataAccess.Common
{

    /// 基础信息数据访问操作
    /// <summary>
    /// 基础信息数据访问操作
    /// </summary>
    public class BasicDAL : DataAccessBase
    { 
        #region 新增类

        /// 带事务的数据集新增
        /// <summary>
        /// 带事务的数据集新增
        /// </summary>
        /// <param name="trans">事务</param>
        /// <param name="TableName">表名</param>
        /// <param name="FieldValue">数据集</param>
        /// <returns></returns>
        public int InsertToTable(DbTransaction trans, string TableName, Dictionary<string, string> FieldValue)
        {
            StringBuilder sql = new StringBuilder();
            sql.AppendFormat("INSERT {0} (", TableName);
            string Field = ") VALUES (";
            StringBuilder Column = new StringBuilder();
            StringBuilder Values = new StringBuilder();
            foreach (KeyValuePair<string, string> var in FieldValue)
            {
                Column.AppendFormat("{0} ,", var.Key);
                Values.AppendFormat("'{0}' ,", var.Value.Replace("'","''"));
            }
            StringBuilder Column2 = Column.Remove(Column.Length - 1, 1);
            StringBuilder Values2 = Values.Remove(Values.Length - 1, 1);
            sql.AppendFormat("{0}{1}{2})", Column2.ToString(), Field, Values2.ToString());
            sql.Append(" select @@IDENTITY");
            object row = null;
            if (trans != null)
            {
                 row = ExecuteScalar(trans, CommandType.Text, sql.ToString());
            }
            else
            {
                 row = ExecuteScalar(CommandType.Text, sql.ToString());
            }
            if (row != null && row != DBNull.Value)
            {
                return Convert.ToInt32(row);
            }
            else
            {
                return 0;
            }
        }

        /// 带事务的数据集新增
        /// <summary>
        /// 带事务的数据集新增
        /// </summary>
        /// <param name="trans">事务</param>
        /// <param name="TableName">表名</param>
        /// <param name="FieldValue">数据集</param>
        /// <returns></returns>
        public int InsertTable(DbTransaction trans, string TableName, Dictionary<string, string> FieldValue)
        {
            StringBuilder sql = new StringBuilder();
            sql.AppendFormat("INSERT {0} (", TableName);
            string Field = ") VALUES (";
            StringBuilder Column = new StringBuilder();
            StringBuilder Values = new StringBuilder();
            string[] arr_Values = null;
            foreach (KeyValuePair<string, string> var in FieldValue)
            {
                Column.AppendFormat("{0} ,", var.Key);

                try
                {
                    arr_Values = null;
                    arr_Values = var.Value.ToString().Trim().Split('﹌'); 
                    if (arr_Values[1].ToString() == "1")
                    {
                        Values.AppendFormat("{0} ,", arr_Values[0].ToString().Replace("'", "''"));
                    }
                    else if (var.Value[1].ToString() == "2")
                    {
                        //sql.AppendFormat(" {0},", var.Key, "NULL");
                        Values.AppendFormat("{0} ,", "NULL");
                    }
                    else
                    {
                        Values.AppendFormat("'{0}' ,", arr_Values[0].ToString().Replace("'", "''"));
                    }
                }
                catch
                {
                    Values.AppendFormat("'{0}' ,", var.Value.Replace("'", "''"));
                }
            }
            StringBuilder Column2 = Column.Remove(Column.Length - 1, 1);
            StringBuilder Values2 = Values.Remove(Values.Length - 1, 1);
            sql.AppendFormat("{0}{1}{2})", Column2.ToString(), Field, Values2.ToString());
            sql.Append(" select @@IDENTITY");

            object row = ExecuteScalar(trans, CommandType.Text, sql.ToString());
            if (row != null && row != DBNull.Value)
            {
                return Convert.ToInt32(row);
            }
            else
            {
                return 0;
            }
        }

        /// 带事务的数据集新增
        /// <summary>
        /// 带事务的数据集新增
        /// </summary>
        /// <param name="trans">事务</param>
        /// <param name="TableName">表名</param>
        /// <param name="FieldValue">数据集</param>
        /// <returns></returns>
        public int InsertToTable(DbTransaction trans, string TableName, Dictionary<string, string[]> FieldValue)
        {
            StringBuilder sql = new StringBuilder();
            sql.AppendFormat("INSERT {0} (", TableName);
            string Field = ") VALUES (";
            StringBuilder Column = new StringBuilder();
            StringBuilder Values = new StringBuilder();
            foreach (KeyValuePair<string, string[]> var in FieldValue)
            {
                Column.AppendFormat("{0} ,", var.Key);
                if (var.Value[1].ToString() == "1")
                {
                    Values.AppendFormat("{0} ,", var.Value[0].ToString().Replace("'", "''"));
                }
                else if (var.Value[1].ToString() == "2")
                {
                    //sql.AppendFormat(" {0}   ,", var.Key, "NULL");
                    Values.AppendFormat("{0} ,", "NULL");
                }
                else
                {
                    Values.AppendFormat("'{0}' ,", var.Value[0].ToString().Replace("'", "''"));
                }
            }
            StringBuilder Column2 = Column.Remove(Column.Length - 1, 1);
            StringBuilder Values2 = Values.Remove(Values.Length - 1, 1);
            sql.AppendFormat("{0}{1}{2})", Column2.ToString(), Field, Values2.ToString());
            sql.Append(" select @@IDENTITY");

            object row = ExecuteScalar(trans, CommandType.Text, sql.ToString());
            if (row != null && row != DBNull.Value)
            {
                return Convert.ToInt32(row);
            }
            else
            {
                return 0;
            }
        }

        /// 数据集新增
        /// <summary>
        /// 数据集新增
        /// </summary>
        /// <param name="trans">事务</param>
        /// <param name="TableName">表名</param>
        /// <param name="FieldValue">数据集</param>
        /// <returns></returns>
        public int InsertToTable(string TableName, Dictionary<string, string> FieldValue)
        {
            StringBuilder sql = new StringBuilder();
            sql.AppendFormat("INSERT {0} (", TableName);
            string Field = ") VALUES (";
            StringBuilder Column = new StringBuilder();
            StringBuilder Values = new StringBuilder();
            foreach (KeyValuePair<string, string> var in FieldValue)
            {
                Column.AppendFormat("{0} ,", var.Key);
                Values.AppendFormat("'{0}' ,", var.Value.Replace("'","''"));
            }
            StringBuilder Column2 = Column.Remove(Column.Length - 1, 1);
            StringBuilder Values2 = Values.Remove(Values.Length - 1, 1);
            sql.AppendFormat("{0}{1}{2})", Column2.ToString(), Field, Values2.ToString());
            sql.Append(" select @@IDENTITY");

            object row = ExecuteScalar(CommandType.Text, sql.ToString());
            if (row != null && row != DBNull.Value)
            {
                return Convert.ToInt32(row);
            }
            else
            {
                return 0;
            }
        }


        public int InsertToTable_IDENTITY_INSERT(string TableName, Dictionary<string, string> FieldValue)
        {
            StringBuilder sql = new StringBuilder();
            sql.AppendFormat("set IDENTITY_INSERT " + TableName + " on INSERT {0} (", TableName);
            string Field = ") VALUES (";
            StringBuilder Column = new StringBuilder();
            StringBuilder Values = new StringBuilder();
            foreach (KeyValuePair<string, string> var in FieldValue)
            {
                Column.AppendFormat("{0} ,", var.Key);
                Values.AppendFormat("'{0}' ,", var.Value.Replace("'", "''"));
            }
            StringBuilder Column2 = Column.Remove(Column.Length - 1, 1);
            StringBuilder Values2 = Values.Remove(Values.Length - 1, 1);
            sql.AppendFormat("{0}{1}{2})", Column2.ToString(), Field, Values2.ToString());
            sql.Append(" set IDENTITY_INSERT " + TableName + " off");

            object row = ExecuteScalar(CommandType.Text, sql.ToString());
            if (row != null && row != DBNull.Value)
            {
                return Convert.ToInt32(row);
            }
            else
            {
                return 0;
            }
        }

        /// 数据集新增
        /// <summary>
        /// 数据集新增
        /// </summary>
        /// <param name="TableName">表名</param>
        /// <param name="FieldValue">数据集</param>
        /// <returns></returns>
        public int InsertTable(string TableName, Dictionary<string, string> FieldValue)
        {
            StringBuilder sql = new StringBuilder();
            sql.AppendFormat("INSERT {0} (", TableName);
            string Field = ") VALUES (";
            StringBuilder Column = new StringBuilder();
            StringBuilder Values = new StringBuilder();
            string[] arr_Values = null;
            foreach (KeyValuePair<string, string> var in FieldValue)
            {
                Column.AppendFormat("{0} ,", var.Key);

                try
                {
                    arr_Values = null;
                    arr_Values = var.Value.ToString().Trim().Split('﹌');
                    if (arr_Values[1].ToString() == "1")
                    {
                        Values.AppendFormat("{0} ,", arr_Values[0].ToString().Replace("'", "''"));
                    }
                    else if (var.Value[1].ToString() == "2")
                    {
                       // sql.AppendFormat(" {0} ,", var.Key, "NULL");
                        Values.AppendFormat("{0} ,", "NULL");
                    }
                    else
                    {
                        Values.AppendFormat("'{0}' ,", arr_Values[0].ToString().Replace("'", "''"));
                    }
                }
                catch
                {
                    Values.AppendFormat("'{0}' ,", var.Value.Replace("'", "''"));
                }
            }
            StringBuilder Column2 = Column.Remove(Column.Length - 1, 1);
            StringBuilder Values2 = Values.Remove(Values.Length - 1, 1);
            sql.AppendFormat("{0}{1}{2})", Column2.ToString(), Field, Values2.ToString());
            sql.Append(" select @@IDENTITY");

            object row = ExecuteScalar(CommandType.Text, sql.ToString());
            if (row != null && row != DBNull.Value)
            {
                return Convert.ToInt32(row);
            }
            else
            {
                return 0;
            }
        }

        /// 数据集新增
        /// <summary>
        /// 数据集新增
        /// </summary>
        /// <param name="TableName">表名</param>
        /// <param name="FieldValue">数据集</param>
        /// <returns></returns>
        public int InsertToTable(string TableName, Dictionary<string, string[]> FieldValue)
        {
            StringBuilder sql = new StringBuilder();
            sql.AppendFormat("INSERT {0} (", TableName);
            string Field = ") VALUES (";
            StringBuilder Column = new StringBuilder();
            StringBuilder Values = new StringBuilder();
            foreach (KeyValuePair<string, string[]> var in FieldValue)
            {
                Column.AppendFormat("{0} ,", var.Key);
                if (var.Value[1].ToString() == "1")
                {
                    Values.AppendFormat("{0} ,", var.Value[0].ToString());
                }
                else if (var.Value[1].ToString() == "2")
                {
                   // sql.AppendFormat(" {0} ,", var.Key, "NULL");
                   Values.AppendFormat("{0} ,", "NULL");
                }
                else
                {
                    Values.AppendFormat("'{0}' ,", var.Value[0].ToString());
                }
            }
            StringBuilder Column2 = Column.Remove(Column.Length - 1, 1);
            StringBuilder Values2 = Values.Remove(Values.Length - 1, 1);
            sql.AppendFormat("{0}{1}{2})", Column2.ToString(), Field, Values2.ToString());
            sql.Append(" select @@IDENTITY");

            object row = ExecuteScalar(CommandType.Text, sql.ToString());
            if (row != null && row != DBNull.Value)
            {
                return Convert.ToInt32(row);
            }
            
            else
            {
                return 0;
            }
        }

        /// 参数新增
        /// <summary>
        /// 参数新增
        /// </summary>
        /// <param name="trans">事务</param>
        /// <param name="TableName">表名</param>
        /// <param name="Field">字段名</param>
        /// <param name="Value">参数值, 加VALUES</param>
        /// <returns></returns>
        public int InsertToTable(DbTransaction trans, string TableName, string Field, string Value)
        {
            StringBuilder sql = new StringBuilder();
            sql.AppendFormat("INSERT {0} ({1}) ", TableName, Field);
            sql.AppendFormat("{0}", Value);

            object row = ExecuteScalar(trans, CommandType.Text, sql.ToString());
            if (row != null && row != DBNull.Value)
            {
                return Convert.ToInt32(row);
            }
            else
            {
                return 0;
            }
        }

        /// 参数新增
        /// <summary>
        /// 参数新增
        /// </summary>
        /// <param name="TableName">表名</param>
        /// <param name="Field">字段名</param>
        /// <param name="Value">参数值, 加VALUES</param>
        /// <returns></returns>
        public int InsertToTable(string TableName, string Field, string Value)
        {
            StringBuilder sql = new StringBuilder();
            sql.AppendFormat("INSERT {0} ({1}) ", TableName, Field);
            sql.AppendFormat("{0}", Value);

            object row = ExecuteScalar(CommandType.Text, sql.ToString());
            if (row != null && row != DBNull.Value)
            {
                return Convert.ToInt32(row);
            }
            else
            {
                return 0;
            }
        }

        /// 参数新增
        /// <summary>
        /// 参数新增
        /// </summary>
        /// <param name="trans">事务</param>
        /// <param name="Value">参数值</param>
        /// <returns></returns>
        public int InsertToTable(DbTransaction trans, string Value)
        {
            StringBuilder sql = new StringBuilder();
            sql.AppendFormat("{0}", Value);

            object row = ExecuteScalar(trans, CommandType.Text, sql.ToString());
            if (row != null && row != DBNull.Value)
            {
                return Convert.ToInt32(row);
            }
            else
            {
                return 0;
            }
        }

        /// 参数新增
        /// <summary>
        /// 参数新增
        /// </summary>
        /// <param name="Value">参数值</param>
        /// <returns></returns>
        public int InsertToTable(string Value)
        {
            StringBuilder sql = new StringBuilder();
            sql.AppendFormat("{0}", Value);

            object row = ExecuteScalar(CommandType.Text, sql.ToString());
            if (row != null && row != DBNull.Value)
            {
                return Convert.ToInt32(row);
            }
            else
            {
                return 0;
            }
        }
        #endregion

        #region 修改类

        /// 更新数据
        /// <summary>
        /// 更新数据
        /// </summary>
        /// <param name="Where">条件</param>
        /// <returns></returns>
        public int UpdateToTable(string Where)
        {
            StringBuilder sql = new StringBuilder();
            sql.AppendFormat("{0}", Where);
            return ExecuteNonQuery(CommandType.Text, sql.ToString());
        }

        /// 更新数据
        /// <summary>
        /// 更新数据
        /// </summary>
        /// <param name="trans">事务</param>
        /// <param name="TableName">表名</param>
        /// <param name="Value">更新列数据</param>
        /// <param name="Where">条件</param>
        /// <returns></returns>
        public int UpdateToTable(DbTransaction trans, string Where)
        {
            StringBuilder sql = new StringBuilder();
            sql.AppendFormat("{0}", Where);
            return ExecuteNonQuery(trans, CommandType.Text, sql.ToString());
        }

        /// 更新数据
        /// <summary>
        /// 更新数据
        /// </summary>
        /// <param name="TableName">表名</param>
        /// <param name="Value">更新列数据</param>
        /// <param name="Where">条件</param>
        /// <returns></returns>
        public int UpdateToTable(string TableName, string Value, string Where)
        {
            StringBuilder sql = new StringBuilder();
            sql.AppendFormat(" UPDATE  {0}  ", TableName);
            sql.AppendFormat(" SET  {0}", Value);
            sql.AppendFormat(" where 1=1  {0}", Where);
            return ExecuteNonQuery(CommandType.Text, sql.ToString());
        }

        /// 更新数据
        /// <summary>
        /// 更新数据
        /// </summary>
        /// <param name="trans">事务</param>
        /// <param name="TableName">表名</param>
        /// <param name="Value">更新列数据</param>
        /// <param name="Where">条件</param>
        /// <returns></returns>
        public int UpdateToTable(DbTransaction trans, string TableName, string Value, string Where)
        {
            StringBuilder sql = new StringBuilder();
            sql.AppendFormat(" UPDATE  {0}  ", TableName);
            sql.AppendFormat(" SET  {0}", Value);
            sql.AppendFormat(" where 1=1  {0}", Where);
            return ExecuteNonQuery(trans, CommandType.Text, sql.ToString());
        }

        /// 数据集更新
        /// <summary>
        /// 数据集更新
        /// </summary>
        /// <param name="TableName">表名</param>
        /// <param name="FieldValue">数据集</param>
        /// <param name="Where">条件</param>
        /// <returns></returns>
        public int UpdateToTable(string TableName, Dictionary<string, string> FieldValue, string Where)
        {
            StringBuilder sql = new StringBuilder();

            foreach (KeyValuePair<string, string> var in FieldValue)
            {
                sql.AppendFormat(" {0} = '{1}'  ,", var.Key, var.Value.Replace("'","''"));
            }

            StringBuilder values = sql.Remove(sql.Length - 2, 2);
            return UpdateToTable(TableName, values.ToString(), Where);
        }

        /// 数据集更新
        /// <summary>
        /// 数据集更新
        /// </summary>
        /// <param name="TableName">表名</param>
        /// <param name="FieldValue">数据集</param>
        /// <param name="Where">条件</param>
        /// <returns></returns>
        public int UpdateTable(string TableName, Dictionary<string, string> FieldValue, string Where)
        {
            StringBuilder sql = new StringBuilder();
            string[] arr_Values = null;
            foreach (KeyValuePair<string, string> var in FieldValue)
            {
                try
                {
                    arr_Values = null;
                    arr_Values = var.Value.ToString().Trim().Split('﹌');
                    if (arr_Values[1].ToString() == "1")
                    {
                        sql.AppendFormat(" {0} = {1}   ,", var.Key, arr_Values[0].ToString());
                    }
                    else if (arr_Values[1].ToString() == "2")
                    {
                        sql.AppendFormat(" {0} = {1}   ,", var.Key,"NULL");
                    }
                    else
                    {
                        sql.AppendFormat(" {0} = '{1}'   ,", var.Key, arr_Values[0].ToString());
                    }
                }
                catch
                {
                    sql.AppendFormat(" {0} = '{1}'  ,", var.Key, var.Value);
                }
            }

            StringBuilder values = sql.Remove(sql.Length - 2, 2);
            return UpdateToTable(TableName, values.ToString(), Where);
        }

        /// 数据集更新
        /// <summary>
        /// 数据集更新
        /// </summary>
        /// <param name="trans">事务</param>
        /// <param name="TableName">表名</param>
        /// <param name="FieldValue">数据集</param>
        /// <param name="Where">条件</param>
        /// <returns></returns>
        public int UpdateToTable(string TableName, Dictionary<string, string[]> FieldValue, string Where)
        {
            StringBuilder sql = new StringBuilder();

            foreach (KeyValuePair<string, string[]> var in FieldValue)
            {
                if (var.Value[1].ToString() == "1")
                {
                    sql.AppendFormat(" {0} = {1}  ,", var.Key, var.Value);
                }
                else
                {
                    sql.AppendFormat(" {0} = '{1}'  ,", var.Key, var.Value);
                }
            }

            StringBuilder values = sql.Remove(sql.Length - 2, 2);
            return UpdateToTable(TableName, values.ToString(), Where);
        }

        /// 带事务的数据集更新
        /// <summary>
        /// 带事务的数据集更新
        /// </summary>
        /// <param name="trans">事务</param>
        /// <param name="TableName">表名</param>
        /// <param name="FieldValue">数据集</param>
        /// <param name="Where">条件</param>
        /// <returns></returns>
        public int UpdateToTable(DbTransaction trans, string TableName, Dictionary<string, string> FieldValue, string Where)
        {
            StringBuilder sql = new StringBuilder();

            foreach (KeyValuePair<string, string> var in FieldValue)
            {
                sql.AppendFormat(" {0} = '{1}'  ,", var.Key, var.Value);
            }

            StringBuilder values = sql.Remove(sql.Length - 2, 2);
            return UpdateToTable(trans, TableName, values.ToString(), Where);
        }

        /// 带事务的数据集更新
        /// <summary>
        /// 带事务的数据集更新
        /// </summary>
        /// <param name="trans">事务</param>
        /// <param name="TableName">表名</param>
        /// <param name="FieldValue">数据集</param>
        /// <param name="Where">条件</param>
        /// <returns></returns>
        public int UpdateTable(DbTransaction trans, string TableName, Dictionary<string, string> FieldValue, string Where)
        {
            StringBuilder sql = new StringBuilder();
            string[] arr_Values = null;
            foreach (KeyValuePair<string, string> var in FieldValue)
            {
                try
                {
                    arr_Values = null;
                    arr_Values = var.Value.ToString().Trim().Split('﹌');
                    if (arr_Values[1].ToString() == "1")
                    {
                        sql.AppendFormat(" {0} = {1}  ,", var.Key, arr_Values[0].ToString());
                    }
                    else if (arr_Values[1].ToString() == "2")
                    {
                        sql.AppendFormat(" {0} = {1}   ,", var.Key, "NULL");
                    }
                    else
                    {
                        sql.AppendFormat(" {0} = '{1}'  ,", var.Key, arr_Values[0].ToString());
                    }
                }
                catch
                {
                    sql.AppendFormat(" {0} = '{1}'  ,", var.Key, var.Value);
                }
            }

            StringBuilder values = sql.Remove(sql.Length - 2, 2);
            return UpdateToTable(trans, TableName, values.ToString(), Where);
        }

        /// 带事务的数据集更新
        /// <summary>
        /// 带事务的数据集更新
        /// </summary>
        /// <param name="trans">事务</param>
        /// <param name="TableName">表名</param>
        /// <param name="FieldValue">数据集</param>
        /// <param name="Where">条件</param>
        /// <returns></returns>
        public int UpdateToTable(DbTransaction trans, string TableName, Dictionary<string, string[]> FieldValue, string Where)
        {
            StringBuilder sql = new StringBuilder();

            foreach (KeyValuePair<string, string[]> var in FieldValue)
            {
                if (var.Value[1].ToString() == "1")
                {
                    sql.AppendFormat(" {0} = {1}  ,", var.Key, var.Value);
                }
                else
                {
                    sql.AppendFormat(" {0} = '{1}'  ,", var.Key, var.Value);
                }
            }

            StringBuilder values = sql.Remove(sql.Length - 2, 2);
            return UpdateToTable(trans, TableName, values.ToString(), Where);
        }
        #endregion

        #region 删除类

        /// 删除
        /// <summary>
        /// 删除
        /// </summary>
        /// <param name="Where">条件</param>
        /// <returns></returns>
        public int DelToTable(string Where)
        {
            StringBuilder sql = new StringBuilder();
            sql.AppendFormat("{0} ", Where);
            return ExecuteNonQuery(CommandType.Text, sql.ToString());
        }

        /// 带事务的删除
        /// <summary>
        /// 带事务的删除
        /// </summary>
        /// <param name="trans">事务</param>
        /// <param name="Where">条件</param>
        /// <returns></returns>
        public int DelToTable(DbTransaction trans, string Where)
        {
            StringBuilder sql = new StringBuilder();
            sql.AppendFormat(" {0} ", Where);
            return ExecuteNonQuery(trans, CommandType.Text, sql.ToString());
        }

        /// 删除
        /// <summary>
        /// 删除
        /// </summary>
        /// <param name="TableName">表名</param>
        /// <param name="Where">条件</param>
        /// <returns></returns>
        public int DelToTable(string TableName, string Where)
        {
            StringBuilder sql = new StringBuilder();
            sql.AppendFormat("DELETE FROM  {0} ", TableName);
            sql.AppendFormat("  WHERE 1=1 {0} ", Where);
            return ExecuteNonQuery(CommandType.Text, sql.ToString());
        }

        /// 带事务的删除
        /// <summary>
        /// 带事务的删除
        /// </summary>
        /// <param name="trans">事务</param>
        /// <param name="TableName">表名</param>
        /// <param name="Where">条件</param>
        /// <returns></returns>
        public int DelToTable(DbTransaction trans, string TableName, string Where)
        {
            StringBuilder sql = new StringBuilder();
            sql.AppendFormat("DELETE FROM  {0} ", TableName);
            sql.AppendFormat("  WHERE 1=1 {0} ", Where);
            return ExecuteNonQuery(trans, CommandType.Text, sql.ToString());
        }

        /// 批量删除不同表
        /// <summary>
        /// 批量删除不同表
        /// </summary>
        /// <param name="TableName">删除表名</param>
        /// <param name="tableName">条件</param>
        /// <returns></returns>
        public void DelToTable(Dictionary<int, string> TableName, string Where)
        {
            foreach (KeyValuePair<int, string> var in TableName)
            {
                StringBuilder sql = new StringBuilder();
                sql.AppendFormat("DELETE FROM {0} WHERE 1 = 1 {1}", var.Value, Where);
                ExecuteNonQuery(CommandType.Text, sql.ToString());
            }
        }

        /// 批量删除不同表
        /// <summary>
        /// 批量删除不同表
        /// </summary>
        /// <param name="trans">事务</param>
        /// <param name="TableName">删除表名</param>
        /// <param name="tableName">条件</param>
        /// <returns></returns>
        public void DelToTable(DbTransaction trans, Dictionary<int, string> TableName, string Where)
        {
            foreach (KeyValuePair<int, string> var in TableName)
            {
                StringBuilder sql = new StringBuilder();
                sql.AppendFormat("DELETE FROM {0} WHERE 1 = 1 {1}", var.Value, Where);
                ExecuteNonQuery(trans, CommandType.Text, sql.ToString());
            }
        }

        /// 删除
        /// <summary>
        /// 删除
        /// </summary>
        /// <param name="updateValue">删除条件集合</param>
        /// <param name="Field">删除字段</param>
        /// <param name="tableName">表名</param>
        /// <returns></returns>
        public int delToTable(Dictionary<int, string> Value, string Field, string TableName)
        {
            StringBuilder sql = new StringBuilder();
            sql.AppendFormat("DELETE FROM {0} WHERE {1} IN (", TableName, Field);
            foreach (KeyValuePair<int, string> var in Value)
            {
                sql.AppendFormat("'{0}' , ", var.Value);
            }
            StringBuilder values = sql.Remove(sql.Length - 2, 1);
            sql.AppendFormat(")");

            return ExecuteNonQuery(CommandType.Text, sql.ToString());
        }

        /// 删除
        /// <summary>
        /// 删除
        /// </summary>
        /// <param name="trans">事务</param>
        /// <param name="updateValue">删除条件集合</param>
        /// <param name="Field">删除字段</param>
        /// <param name="tableName">表名</param>
        /// <returns></returns>
        public int delToTable(DbTransaction trans, Dictionary<int, string> Value, string Field, string TableName)
        {
            StringBuilder sql = new StringBuilder();
            sql.AppendFormat("DELETE FROM {0} WHERE {1} IN (", TableName, Field);
            foreach (KeyValuePair<int, string> var in Value)
            {
                sql.AppendFormat("'{0}' , ", var.Value);
            }
            StringBuilder values = sql.Remove(sql.Length - 2, 1);
            sql.AppendFormat(")");

            return ExecuteNonQuery(trans, CommandType.Text, sql.ToString());
        }
        #endregion

        #region 查询类(返回bool,int,string,DataSet)

        /// 在表中是否存在
        /// <summary>
        /// 在表中是否存在
        /// </summary>
        /// <param name="tableName">表名</param>
        /// <param name="where">检测条件</param>
        /// <returns></returns>
        public bool CheckToTable(string TableName, string Where)
        {
            StringBuilder sql = new StringBuilder();
            sql.AppendFormat("select count(*) from {0} where 1=1 {1} ", TableName, DataRightsWhere(TableName) + Where);
            object rules = ExecuteScalar(CommandType.Text, sql.ToString());
            if (rules == null)
            {
                return false;
            }
            else
            {
                if (Convert.ToInt32(rules) > 0)
                {
                    return true;
                }
                else
                {
                    return false;
                }
            }
        }

        /// 在表中是否存在
        /// <summary>
        /// 在表中是否存在
        /// </summary>
        /// <param name="tableName">表名</param>
        /// <param name="where">检测条件</param>
        /// <returns></returns>
        public bool CheckToTable(string TableName, string Where, string File)
        {
            StringBuilder sql = new StringBuilder();
            sql.AppendFormat("select top 1 " + File + " from {0} where 1=1 {1} ", TableName, DataRightsWhere(TableName) + Where);
            object rules = ExecuteScalar(CommandType.Text, sql.ToString());
            if (rules == null)
            {
                return false;
            }
            else
            {
                if (Convert.ToInt32(rules) > 0)
                {
                    return true;
                }
                else
                {
                    return false;
                }
            }
        }

        /// 在表中是否存在
        /// <summary>
        /// 在表中是否存在
        /// </summary>
        /// <param name="trans">事务</param>
        /// <param name="tableName">表名</param>
        /// <param name="where">检测条件</param>
        /// <returns></returns>
        public bool CheckToTable(DbTransaction trans, string TableName, string Where)
        {
            StringBuilder sql = new StringBuilder();
            sql.AppendFormat("select count(*) from {0} where 1=1 {1} ", TableName, DataRightsWhere(TableName) + Where);
            object rules = ExecuteScalar(trans, CommandType.Text, sql.ToString());
            if (rules == null)
            {
                return false;
            }
            else
            {
                if (Convert.ToInt32(rules) > 0)
                {
                    return true;
                }
                else
                {
                    return false;
                }
            }
        }

        /// 在表中是否存在
        /// <summary>
        /// 在表中是否存在
        /// </summary>
        /// <param name="trans">事务</param>
        /// <param name="tableName">表名</param>
        /// <param name="where">检测条件</param>
        /// <returns></returns>
        public bool CheckToTable(DbTransaction trans, string TableName, string Where, string File)
        {
            StringBuilder sql = new StringBuilder();
            sql.AppendFormat("select top 1 " + File + " from {0} where 1=1 {1} ", TableName, DataRightsWhere(TableName) + Where);
            object rules = ExecuteScalar(trans, CommandType.Text, sql.ToString());
            if (rules == null)
            {
                return false;
            }
            else
            {
                if (Convert.ToInt32(rules) > 0)
                {
                    return true;
                }
                else
                {
                    return false;
                }
            }
        }

        /// 在表中统计数据条数
        /// <summary>
        /// 在表中统计数据条数
        /// </summary>
        /// <param name="tableName">表名</param>
        /// <param name="where">条件</param>
        /// <returns></returns>
        public int CountToTable(DbTransaction trans, string TableName, string Where)
        {
            StringBuilder sql = new StringBuilder();
            sql.AppendFormat("select COUNT(1) IDC from {0} where 1=1 {1} ", TableName, DataRightsWhere(TableName) + Where);
            DataSet ds = ExecuteDataSet(trans, CommandType.Text, sql.ToString());
            if (ds != null && ds.Tables[0].Rows.Count > 0)
            {
                return Convert.ToInt32(ds.Tables[0].Rows[0][0].ToString());
            }
            else
            {
                return 0;
            }
        }

        /// 在表中统计数据条数
        /// <summary>
        /// 在表中统计数据条数
        /// </summary>
        /// <param name="tableName">表名</param>
        /// <param name="where">条件</param>
        /// <returns></returns>
        public int CountToTable(string TableName, string Where)
        {
            StringBuilder sql = new StringBuilder();
            sql.AppendFormat("select COUNT(1) from {0} where 1=1 {1} ", TableName, DataRightsWhere(TableName) + Where);
            DataSet ds = ExecuteDataSet(CommandType.Text, sql.ToString());
            if (ds != null && ds.Tables[0].Rows.Count > 0)
            {
                return Convert.ToInt32(ds.Tables[0].Rows[0][0].ToString());
            }
            else
            {
                return 0;
            }
        }

        /// 在表中某字段统计数据条数
        /// <summary>
        /// 在表中某字段统计数据条数
        /// </summary>
        /// <param name="tableName">表名</param>
        /// <param name="where">条件</param>
        /// <param name="filed">字段</param>
        /// <returns></returns>
        public int CountToTable(DbTransaction trans, string TableName, string Where, string Filed)
        {
            StringBuilder sql = new StringBuilder();
            sql.AppendFormat("select COUNT(Distinct {2}) IDC from {0} where 1=1 {1} ", TableName, DataRightsWhere(TableName) + Where, Filed);
            DataSet ds = ExecuteDataSet(trans, CommandType.Text, sql.ToString());
            if (ds != null && ds.Tables[0].Rows.Count > 0)
            {
                return Convert.ToInt32(ds.Tables[0].Rows[0][0].ToString());
            }
            else
            {
                return 0;
            }
        }

        /// 在表中某字段统计数据条数
        /// <summary>
        /// 在表中某字段统计数据条数
        /// </summary>
        /// <param name="tableName">表名</param>
        /// <param name="where">条件</param>
        /// <param name="filed">字段</param>
        /// <returns></returns>
        public int CountToTable(string TableName, string Where, string Filed)
        {
            StringBuilder sql = new StringBuilder();
            sql.AppendFormat("select COUNT(Distinct {2}) from {0} where 1=1 {1} ", TableName, DataRightsWhere(TableName) + Where, Filed);
            DataSet ds = ExecuteDataSet(CommandType.Text, sql.ToString());
            if (ds != null && ds.Tables[0].Rows.Count > 0)
            {
                return Convert.ToInt32(ds.Tables[0].Rows[0][0].ToString());
            }
            else
            {
                return 0;
            }
        }

        /// 在表中某字段统计数据条数
        /// <summary>
        /// 在表中某字段统计数据条数
        /// </summary>
        /// <param name="tableName">表名</param>
        /// <param name="where">条件</param>
        /// <param name="filed">字段</param>
        /// <returns></returns>
        public int GetToTablint(DbTransaction trans, string TableName, string Where, string Filed)
        {
            StringBuilder sql = new StringBuilder();
            sql.AppendFormat("select {2} from {0} where 1=1 {1} ", TableName, DataRightsWhere(TableName) + Where, Filed);
            DataSet ds = ExecuteDataSet(trans, CommandType.Text, sql.ToString());
            if (ds != null && ds.Tables[0].Rows.Count > 0)
            {
                return Convert.ToInt32(ds.Tables[0].Rows[0][0].ToString());
            }
            else
            {
                return 0;
            }
        }

        /// 在表中某字段统计数据条数
        /// <summary>
        /// 在表中某字段统计数据条数
        /// </summary>
        /// <param name="tableName">表名</param>
        /// <param name="where">条件</param>
        /// <param name="filed">字段</param>
        /// <returns></returns>
        public decimal GetToTablintD(DbTransaction trans, string TableName, string Where, string Filed)
        {
            StringBuilder sql = new StringBuilder();
            sql.AppendFormat("select {2} from {0} where 1=1 {1} ", TableName, DataRightsWhere(TableName) + Where, Filed);
            DataSet ds = ExecuteDataSet(trans, CommandType.Text, sql.ToString());
            if (ds != null && ds.Tables[0].Rows.Count > 0)
            {
                return Convert.ToDecimal(ds.Tables[0].Rows[0][0].ToString());
            }
            else
            {
                return 0;
            }
        }

        /// 在表中某字段统计数据条数
        /// <summary>
        /// 在表中某字段统计数据条数
        /// </summary>
        /// <param name="tableName">表名</param>
        /// <param name="where">条件</param>
        /// <param name="filed">字段</param>
        /// <returns></returns>
        public decimal GetToTablintD(string TableName, string Where, string Filed)
        {
            StringBuilder sql = new StringBuilder();
            sql.AppendFormat("select {2} from {0} where 1=1 {1} ", TableName, DataRightsWhere(TableName) + Where, Filed);
            DataSet ds = ExecuteDataSet(CommandType.Text, sql.ToString());
            if (ds != null && ds.Tables[0].Rows.Count > 0)
            {
                return Convert.ToDecimal(ds.Tables[0].Rows[0][0].ToString());
            }
            else
            {
                return 0;
            }
        }

        /// 在表中某字段统计数据条数
        /// <summary>
        /// 在表中某字段统计数据条数
        /// </summary>
        /// <param name="tableName">表名</param>
        /// <param name="where">条件</param>
        /// <param name="filed">字段</param>
        /// <returns></returns>
        public int GetToTablint(string TableName, string Where, string Filed)
        {
            StringBuilder sql = new StringBuilder();
            sql.AppendFormat("select {2} from {0} where 1=1 {1} ", TableName, DataRightsWhere(TableName) + Where, Filed);
            DataSet ds = ExecuteDataSet(CommandType.Text, sql.ToString());
            if (ds != null && ds.Tables[0].Rows.Count > 0)
            {
                return Convert.ToInt32(ds.Tables[0].Rows[0][0].ToString());
            }
            else
            {
                return 0;
            }
        }

        /// 在表中某字段的值
        /// <summary>
        /// 在表中某字段的值
        /// </summary>
        /// <param name="tableName">表名</param>
        /// <param name="where">条件</param>
        /// <param name="filed">字段</param>
        /// <returns></returns>
        public string GetToTable(DbTransaction trans, string TableName, string Where, string Filed)
        {
            StringBuilder sql = new StringBuilder();
            sql.AppendFormat("select {2} IDC from {0} where 1=1 {1} ", TableName, DataRightsWhere(TableName) + Where, Filed);
            DataSet ds = ExecuteDataSet(trans, CommandType.Text, sql.ToString());
            if (ds != null && ds.Tables[0].Rows.Count > 0)
            {
                return ds.Tables[0].Rows[0][0].ToString();
            }
            else
            {
                return "";
            }
        }

        /// 在表中某字段的值
        /// <summary>
        /// 在表中某字段的值
        /// </summary>
        /// <param name="tableName">表名</param>
        /// <param name="where">条件</param>
        /// <param name="filed">字段</param>
        /// <returns></returns>
        public string GetToTable(string TableName, string Where, string Filed)
        {
            StringBuilder sql = new StringBuilder();
            sql.AppendFormat("select {2} from {0} where 1=1 {1} ", TableName, DataRightsWhere(TableName) + Where, Filed);
            DataSet ds = ExecuteDataSet(CommandType.Text, sql.ToString());
            if (ds != null && ds.Tables[0].Rows.Count > 0)
            {
                return ds.Tables[0].Rows[0][0].ToString();
            }
            else
            {
                return "";
            }
        }

        /// 条件查询表中列的数据
        /// <summary>
        /// 条件查询表中列的数据
        /// </summary>
        /// <param name="TableName">表名</param>
        /// <param name="Column">列名</param>
        /// <param name="Where">条件</param>
        /// <returns></returns>
        public DataSet SearchToTable(string TableName, string Where)
        {
            StringBuilder sql = new StringBuilder();
            sql.AppendFormat("select * from {0}  where 1=1 {1}", TableName, DataRightsWhere(TableName) + Where);

            return ExecuteDataSet(CommandType.Text, sql.ToString());
        }

        /// 条件查询表中列的数据
        /// <summary>
        /// 条件查询表中列的数据
        /// </summary>
        /// <param name="trans">事物</param>
        /// <param name="TableName">表名</param>
        /// <param name="Column">列名</param>
        /// <param name="Where">条件</param>
        /// <returns>DataSet</returns>
        public DataSet SearchToTable(DbTransaction trans, string TableName, string Where)
        {
            StringBuilder sql = new StringBuilder();
            sql.AppendFormat("select * from {0}  where 1=1 {1}", TableName, DataRightsWhere(TableName) + Where);

            return ExecuteDataSet(trans, CommandType.Text, sql.ToString());
        }

        /// 条件查询表中列的数据
        /// <summary>
        /// 条件查询表中列的数据
        /// </summary>
        /// <param name="TableName">表名</param>
        /// <param name="Column">列名</param>
        /// <param name="Where">条件</param>
        /// <returns></returns>
        public DataSet SearchToTable(string TableName, string Column, string Where)
        {
            StringBuilder sql = new StringBuilder();
            sql.AppendFormat("select {0} from {1} where 1=1 {2}", Column, TableName, DataRightsWhere(TableName) + Where);

            return ExecuteDataSet(CommandType.Text, sql.ToString());
        }

        /// 条件查询表中列的数据
        /// <summary>
        /// 条件查询表中列的数据
        /// </summary>
        /// <param name="trans">事物</param>
        /// <param name="TableName">表名</param>
        /// <param name="Column">列名</param>
        /// <param name="Where">条件</param>
        /// <returns>DataSet</returns>
        public DataSet SearchToTable(DbTransaction trans, string TableName, string Column, string Where)
        {
            StringBuilder sql = new StringBuilder();
            sql.AppendFormat("select {0} from {1} where 1=1 {2}", Column, TableName, DataRightsWhere(TableName) + Where);

            return ExecuteDataSet(trans, CommandType.Text, sql.ToString());
        }

        /// 条件查询表中列的数据
        /// <summary>
        /// 条件查询表中列的数据
        /// </summary>
        /// <param name="Where">条件</param>
        /// <returns></returns>
        public DataSet SearchToTable(string Where)
        {
            StringBuilder sql = new StringBuilder();
            sql.AppendFormat("{0}", Where);

            return ExecuteDataSet(CommandType.Text, sql.ToString());
        }

        /// 条件查询表中列的数据
        /// <summary>
        /// 条件查询表中列的数据
        /// </summary>
        /// <param name="trans">事物</param>
        /// <param name="Where">条件</param>
        /// <returns>DataSet</returns>
        public DataSet SearchToTable(DbTransaction trans, string Where)
        {
            StringBuilder sql = new StringBuilder();
            sql.AppendFormat("{0}", Where);

            return ExecuteDataSet(trans, CommandType.Text, sql.ToString());
        }

        /// 条件查询表中列的数据(排序)
        /// <summary>
        /// 条件查询表中列的数据(排序)
        /// </summary>
        /// <param name="TableName">表名</param>
        /// <param name="Column">列名</param>
        /// <param name="Where">条件</param>
        /// <param name="Order">排序</param>
        /// <returns></returns>
        public DataSet SearchToTable(string TableName, string Column, string Where, string Order)
        {
            StringBuilder sql = new StringBuilder();
            sql.AppendFormat("select {0} from {1}  where 1=1 {2} ORDER BY {3}", Column, TableName, DataRightsWhere(TableName) + Where, Order);

            return ExecuteDataSet(CommandType.Text, sql.ToString());
        }

        /// 条件查询表中列的数据(排序)
        /// <summary>
        /// 条件查询表中列的数据(排序)
        /// </summary>
        /// <param name="trans">事物</param>
        /// <param name="TableName">表名</param>
        /// <param name="Column">列名</param>
        /// <param name="Where">条件</param>
        /// <param name="Order">排序</param>
        /// <returns>DataSet</returns>
        public DataSet SearchToTable(DbTransaction trans, string TableName, string Column, string Where, string Order)
        {
            StringBuilder sql = new StringBuilder();
            sql.AppendFormat("select {0} from {1} where 1=1 {2} ORDER BY {3}", Column, TableName, DataRightsWhere(TableName) + Where, Order);

            return ExecuteDataSet(trans, CommandType.Text, sql.ToString());
        }

        //条件查询表中某列的数据
        /// <summary>
        /// 条件查询表中某列的数据
        /// </summary>
        /// <param name="tableName">表名</param>
        /// <param name="searchColumn">查询列名</param>
        /// <param name="where">判断条件</param>
        /// <param name="distinct">是否消除重复(消除重复distinct ,不消除“”)</param>
        /// <returns>DataSet</returns>
        public DataSet searchToTable(string tableName, string searchColumn, string where, string distinct)
        {
            string _Where = "";
            try
            {
                if (System.Web.HttpContext.Current.Session["UserEntity"] != null)
                {
                    BusinessCommon.UserManage.UserInfoLD _UserInfoSZ;
                    _UserInfoSZ = (BusinessCommon.UserManage.UserInfoLD)System.Web.HttpContext.Current.Session["UserEntity"];
                    _Where = ReturnRightsWhere(tableName, _UserInfoSZ.LoginName);

                }
            }
            catch (Exception)
            {
                 
            }
            
            string sql = string.Format("select {0} {1} from {2}  where 1=1 {3} ", distinct, searchColumn, tableName, _Where + where);
            return ExecuteDataSet(CommandType.Text, sql);
        }
        /// <summary>
        /// 传入登录名和表名得到查询的SQLWhere语句条件
        /// </summary>
        /// <param name="TableName"></param>
        /// <param name="LoginName"></param>
        /// <returns></returns>
        public string ReturnRightsWhere(string TableName, string LoginName)
        {
            string _returnWhere = "";
            DataSet _dstWhere = GetProc("Exec [Get_User_Rights] '" + TableName + "','" + LoginName + "'");
            if (_dstWhere.Tables.Count > 0 && _dstWhere.Tables[0].Rows.Count > 0)
            {
                _returnWhere = _dstWhere.Tables[0].Rows[0][0].ToString();
            }
            return _returnWhere;
        }
        /// 条件查询表中列的数据(取唯一)
        /// <summary>
        /// 条件查询表中列的数据(取唯一)
        /// </summary>
        /// <param name="TableName">表名</param>
        /// <param name="Column">列名</param>
        /// <param name="Where">条件</param>
        /// <returns></returns>
        public DataSet DistinctToTable(string TableName, string Column, string Where)
        {
            StringBuilder sql = new StringBuilder();
            sql.AppendFormat("select Distinct {0} from {1} where 1=1 {2}", Column, TableName, DataRightsWhere(TableName) + Where);

            return ExecuteDataSet(CommandType.Text, sql.ToString());
        }

        /// 条件查询表中列的数据(取唯一)
        /// <summary>
        /// 条件查询表中列的数据(取唯一)
        /// </summary>
        /// <param name="trans">事物</param>
        /// <param name="TableName">表名</param>
        /// <param name="Column">列名</param>
        /// <param name="Where">条件</param>
        /// <returns>DataSet</returns>
        public DataSet DistinctToTable(DbTransaction trans, string TableName, string Column, string Where)
        {
            StringBuilder sql = new StringBuilder();
            sql.AppendFormat("select Distinct {0} from {1} where 1=1 {2}", Column, TableName, DataRightsWhere(TableName) + Where);

            return ExecuteDataSet(trans, CommandType.Text, sql.ToString());
        }

        /// 条件查询表中列的数据(取唯一并排序)
        /// <summary>
        /// 条件查询表中列的数据(取唯一并排序)
        /// </summary>
        /// <param name="TableName">表名</param>
        /// <param name="Column">列名</param>
        /// <param name="Where">条件</param>
        /// <param name="Order">排序</param>
        /// <returns></returns>
        public DataSet DistinctToTable(string TableName, string Column, string Where, string Order)
        {
            StringBuilder sql = new StringBuilder();
            sql.AppendFormat("select Distinct {0} from {1} where 1=1 {2} ORDER BY {3}", Column, DataRightsWhere(TableName) + Where, Where, Order);

            return ExecuteDataSet(CommandType.Text, sql.ToString());
        }

        /// 条件查询表中列的数据(取唯一并排序)
        /// <summary>
        /// 条件查询表中列的数据(取唯一并排序)
        /// </summary>
        /// <param name="TableName">表名</param>
        /// <param name="Column">列名</param>
        /// <param name="Where">条件</param>
        /// <param name="Order">排序</param>
        /// <returns></returns>
        public DataSet DistinctToTable2(string TableName, string Column, string Where, string Order)
        {
            StringBuilder sql = new StringBuilder();
            sql.AppendFormat("select Distinct {0} from {1} where 1=1 {2} ORDER BY {3}", Column, TableName, DataRightsWhere(TableName) + Where, Order);

            return ExecuteDataSet(CommandType.Text, sql.ToString());
        }

        /// 条件查询表中列的数据(取唯一并排序)
        /// <summary>
        /// 条件查询表中列的数据(取唯一并排序)
        /// </summary>
        /// <param name="trans">事物</param>
        /// <param name="TableName">表名</param>
        /// <param name="Column">列名</param>
        /// <param name="Where">条件</param>
        /// <param name="Order">排序</param>
        /// <returns>DataSet</returns>
        public DataSet DistinctToTable(DbTransaction trans, string TableName, string Column, string Where, string Order)
        {
            StringBuilder sql = new StringBuilder();
            sql.AppendFormat("select Distinct {0} from {1} where 1=1 {2} ORDER BY {3}", Column, TableName,DataRightsWhere(TableName)+Where, Order);

            return ExecuteDataSet(trans, CommandType.Text, sql.ToString());
        }

        //条件查询整个表数据
        /// <summary>
        /// 条件查询整个表数据
        /// </summary>
        /// <param name="tableName">表名</param>
        /// <param name="where">查询条件</param>
        /// <param name="top">显示条数</param>
        /// <param name="order">排序方式</param>
        /// <returns>DataSet</returns>
        public DataSet selectToTable(string tableName, string where, string top, string order)
        {
            string _Where = "";
            try
            {
                if (System.Web.HttpContext.Current.Session["UserEntity"] != null)
                {
                    BusinessCommon.UserManage.UserInfoLD _UserInfoSZ;
                    _UserInfoSZ = (BusinessCommon.UserManage.UserInfoLD)System.Web.HttpContext.Current.Session["UserEntity"];
                    _Where = ReturnRightsWhere(tableName, _UserInfoSZ.LoginName);

                }
            }
            catch (Exception)
            {
                
                
            }
          
            StringBuilder sql = new StringBuilder();
            sql.AppendFormat("select {0}", string.IsNullOrEmpty(top) ? "" : "top " + top);
            sql.AppendFormat(" * from {0} where 1=1 {1}", tableName, where+_Where);
            sql.AppendFormat(" {0} ", string.IsNullOrEmpty(order) ? "" : "order by " + order);
            return ExecuteDataSet(CommandType.Text, sql.ToString());
        }




        //条件查询整个表数据
        /// <summary>
        /// 条件查询整个表数据
        /// </summary>
        /// <param name="tableName">表名</param>
        /// <param name="where">查询条件</param>
        /// <param name="top">显示条数</param>
        /// <param name="order">排序方式</param>
        /// <returns>DataSet</returns>
        public DataSet selectToTable_New(string tableName, string where)
        {
            StringBuilder sql = new StringBuilder();
            sql.AppendFormat("select top 1");
            sql.AppendFormat(" * from {0} where 1=1 {1}", tableName, where);
            return ExecuteDataSet(CommandType.Text, sql.ToString());
        }





        /// <summary>
        /// 返回权限代码
        /// </summary>
        /// <param name="TableName"></param>
        /// <returns></returns>
        public string DataRightsWhere(string TableName)
        {
            string _Where = "";
            //if (System.Web.HttpContext.Current.Session["UserEntity"] != null)
            //{
            //    BusinessCommon.UserManage.UserInfoLD _UserInfoSZ;
            //    _UserInfoSZ = (BusinessCommon.UserManage.UserInfoLD)System.Web.HttpContext.Current.Session["UserEntity"];
            //    _Where = ReturnRightsWhere(TableName, _UserInfoSZ.LoginName);

            //}
            return _Where;

        }
        //条件查询整个表数据
        /// <summary>fed
        /// 条件查询整个表数据
        /// </summary>
        /// <param name="trans">开启事物</param>
        /// <param name="tableName">表名</param>
        /// <param name="where">查询条件</param>
        /// <param name="top">显示条数</param>
        /// <param name="order">排序方式</param>
        /// <returns>DataSet</returns>
        public DataSet selectToTable(DbTransaction trans, string tableName, string where, string top, string order)
        {
            StringBuilder sql = new StringBuilder();
            sql.AppendFormat("select {0}", string.IsNullOrEmpty(top) ? "" : "top " + top);
            sql.AppendFormat(" * from {0} where 1=1 {1}", tableName, DataRightsWhere(tableName) + where);
            sql.AppendFormat(" {0} ", string.IsNullOrEmpty(order) ? "" : "order by " + order);
            return ExecuteDataSet(trans, CommandType.Text, sql.ToString());
        }

        /// 直接运行存储过程得到数据
        /// <summary>
        /// 直接运行存储过程得到数据
        /// ----fed
        /// </summary>
        /// <returns></returns>
        public DataSet GetProc(string ProcSQL)
        {
            return this.ExecuteDataSet(CommandType.Text, ProcSQL);
        }

        /// 直接运行存储过程得到数据
        /// <summary>
        /// 直接运行存储过程得到数据
        /// ----fed
        /// </summary>
        ///<returns>事务</returns>
        /// <returns></returns>
        public DataSet GetProc(DbTransaction trans, string ProcSQL)
        {
            return this.ExecuteDataSet(trans, CommandType.Text, ProcSQL);
        }

        #endregion

        #region 查询类(返回IDataReader)

        /// 条件查询表中列的数据
        /// <summary>
        /// 条件查询表中列的数据
        /// </summary>
        /// <param name="TableName">表名</param>
        /// <param name="Column">列名</param>
        /// <param name="Where">条件</param>
        /// <returns></returns>
        public IDataReader ReaderToTable(string TableName, string Column, string Where)
        {
            StringBuilder sql = new StringBuilder();
            sql.AppendFormat("select {0} from {1} where 1=1 {2}", Column, TableName, DataRightsWhere(TableName) + Where);

            return ExecuteReader(CommandType.Text, sql.ToString());
        }

        /// 条件查询表中列的数据
        /// <summary>
        /// 条件查询表中列的数据
        /// </summary>
        /// <param name="trans">事物</param>
        /// <param name="TableName">表名</param>
        /// <param name="Column">列名</param>
        /// <param name="Where">条件</param>
        /// <returns>DataSet</returns>
        public IDataReader ReaderToTable(DbTransaction trans, string TableName, string Column, string Where)
        {
            StringBuilder sql = new StringBuilder();
            sql.AppendFormat("select {0} from {1} where 1=1 {2}", Column, TableName, DataRightsWhere(TableName) + Where);

            return ExecuteReader(trans, CommandType.Text, sql.ToString());
        }

        /// 条件查询表中列的数据
        /// <summary>
        /// 条件查询表中列的数据
        /// </summary>
        /// <param name="Where">条件</param>
        /// <returns></returns>
        public IDataReader ReaderToTable(string Where)
        {
            StringBuilder sql = new StringBuilder();
            sql.AppendFormat("{0}", Where);

            return ExecuteReader(CommandType.Text, sql.ToString());
        }

        /// 条件查询表中列的数据
        /// <summary>
        /// 条件查询表中列的数据
        /// </summary>
        /// <param name="trans">事物</param>
        /// <param name="Where">条件</param>
        /// <returns>DataSet</returns>
        public IDataReader ReaderToTable(DbTransaction trans, string Where)
        {
            StringBuilder sql = new StringBuilder();
            sql.AppendFormat("{0}", Where);

            return ExecuteReader(trans, CommandType.Text, sql.ToString());
        }

        /// 条件查询表中列的数据(排序)
        /// <summary>
        /// 条件查询表中列的数据(排序)
        /// </summary>
        /// <param name="TableName">表名</param>
        /// <param name="Column">列名</param>
        /// <param name="Where">条件</param>
        /// <param name="Order">排序</param>
        /// <returns></returns>
        public IDataReader ReaderToTable(string TableName, string Column, string Where, string Order)
        {
            StringBuilder sql = new StringBuilder();
            sql.AppendFormat("select {0} from {1} where 1=1 {2} ORDER BY {3}", Column, TableName, DataRightsWhere(TableName) + Where, Order);

            return ExecuteReader(CommandType.Text, sql.ToString());
        }

        /// 条件查询表中列的数据(排序)
        /// <summary>
        /// 条件查询表中列的数据(排序)
        /// </summary>
        /// <param name="trans">事物</param>
        /// <param name="TableName">表名</param>
        /// <param name="Column">列名</param>
        /// <param name="Where">条件</param>
        /// <param name="Order">排序</param>
        /// <returns>DataSet</returns>
        public IDataReader ReaderToTable(DbTransaction trans, string TableName, string Column, string Where, string Order)
        {
            StringBuilder sql = new StringBuilder();
            sql.AppendFormat("select {0} from {1} where 1=1 {2} ORDER BY {3}", Column, TableName, DataRightsWhere(TableName) + Where, Order);

            return ExecuteReader(trans, CommandType.Text, sql.ToString());
        }

        /// 条件查询表中列的数据(取唯一)
        /// <summary>
        /// 条件查询表中列的数据(取唯一)
        /// </summary>
        /// <param name="TableName">表名</param>
        /// <param name="Column">列名</param>
        /// <param name="Where">条件</param>
        /// <returns></returns>
        public IDataReader DistinctReader(string TableName, string Column, string Where)
        {
            StringBuilder sql = new StringBuilder();
            sql.AppendFormat("select Distinct {0} from {1} where 1=1 {2}", Column, TableName, Where);

            return ExecuteReader(CommandType.Text, sql.ToString());
        }

        /// 条件查询表中列的数据(取唯一)
        /// <summary>
        /// 条件查询表中列的数据(取唯一)
        /// </summary>
        /// <param name="trans">事物</param>
        /// <param name="TableName">表名</param>
        /// <param name="Column">列名</param>
        /// <param name="Where">条件</param>
        /// <returns>DataSet</returns>
        public IDataReader DistinctReader(DbTransaction trans, string TableName, string Column, string Where)
        {
            StringBuilder sql = new StringBuilder();
            sql.AppendFormat("select Distinct {0} from {1} where 1=1 {2}", Column, TableName, DataRightsWhere(TableName) + Where);

            return ExecuteReader(trans, CommandType.Text, sql.ToString());
        }

        /// 条件查询表中列的数据(取唯一并排序)
        /// <summary>
        /// 条件查询表中列的数据(取唯一并排序)
        /// </summary>
        /// <param name="TableName">表名</param>
        /// <param name="Column">列名</param>
        /// <param name="Where">条件</param>
        /// <param name="Order">排序</param>
        /// <returns></returns>
        public IDataReader DistinctReader(string TableName, string Column, string Where, string Order)
        {
            StringBuilder sql = new StringBuilder();
            sql.AppendFormat("select Distinct {0} from {1} where 1=1 {2} ORDER BY {3}", Column, TableName, DataRightsWhere(TableName) + Where, Order);

            return ExecuteReader(CommandType.Text, sql.ToString());
        }

        /// 条件查询表中列的数据(取唯一并排序)
        /// <summary>
        /// 条件查询表中列的数据(取唯一并排序)
        /// </summary>
        /// <param name="trans">事物</param>
        /// <param name="TableName">表名</param>
        /// <param name="Column">列名</param>
        /// <param name="Where">条件</param>
        /// <param name="Order">排序</param>
        /// <returns>DataSet</returns>
        public IDataReader DistinctReader(DbTransaction trans, string TableName, string Column, string Where, string Order)
        {
            StringBuilder sql = new StringBuilder();
            sql.AppendFormat("select Distinct {0} from {1} where 1=1 {2} ORDER BY {3}", Column, TableName, DataRightsWhere(TableName) + Where, Order);

            return ExecuteReader(trans, CommandType.Text, sql.ToString());
        }
        #endregion
    }
}
