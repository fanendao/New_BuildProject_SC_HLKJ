using System;
using System.Collections.Generic;
using System.Text;
using System.Data;
using System.Data.Common;
using System.Data.SqlClient;
using IT.Logistics.CommonComponent.Data;
using System.Configuration;
using System.Web.UI;
namespace SqlDataAccess
{
    /// <summary>
    /// 基础信息数据访问操作
    /// </summary>
    public class BasicDAL : DataAccessBase
    {
        #region 所有表操作
        //插入指定数据到指定表
        /// <summary>
        /// 插入指定数据到指定表
        /// </summary>
        /// <param name="trans">开启事物</param>
        /// <param name="tableName">表名</param>
        /// <param name="columnAndValue">字段以及对应的值</param>
        /// <returns></returns>
        public int insertToTable(DbTransaction trans, string tableName, Dictionary<string, string> columnAndValue)
        {
            StringBuilder sql = new StringBuilder();
            sql.AppendFormat("INSERT {0} (", tableName);
            string gjz = ")  VALUES (";
            StringBuilder column = new StringBuilder();
            StringBuilder values = new StringBuilder();
            foreach (KeyValuePair<string, string> var in columnAndValue)
            {
                column.AppendFormat("{0} ,", var.Key);
                values.AppendFormat("'{0}' ,", var.Value.Replace("'","''"));
            }
            StringBuilder column2 = column.Remove(column.Length - 1, 1);
            StringBuilder values2 = values.Remove(values.Length - 1, 1);
            sql.AppendFormat("{0}{1}{2})", column2.ToString(), gjz, values2);
            sql.Append(" select @@IDENTITY");

            object row = ExecuteScalar(trans, CommandType.Text, sql.ToString());
            if (row != null && row != DBNull.Value)
            {
                //InsertSqlLog(trans, sql.ToString());
                return Convert.ToInt32(row);
            }
            else
            {
                throw new InvalidOperationException("数据库操作失败！");
            }

        }
        //插入指定数据到指定表
        /// <summary>
        /// 插入指定数据到指定表
        /// </summary>
        /// <param name="trans">开启事物</param>
        /// <param name="tableName">表名</param>
        /// <param name="setValue">字段名</param>
        /// <param name="where">条件</param>
        /// <returns></returns>
        public int insertToTable(DbTransaction trans, string tableName, string setValue, string where)
        {
            StringBuilder sql = new StringBuilder();
            sql.AppendFormat("INSERT {0} ({1}) ", tableName, setValue);
            sql.AppendFormat("{0}", where);
            //InsertSqlLog(trans, sql.ToString());
            return ExecuteNonQuery(trans, CommandType.Text, sql.ToString());
        }
        //插入指定数据到指定表
        /// <summary>
        /// 插入指定数据到指定表
        /// </summary>
        /// <param name="tableName">表名</param>
        /// <param name="columnAndValue">字段以及对应的值</param>
        /// <returns></returns>
        public int insertToTable(string tableName, Dictionary<string, string> columnAndValue)
        {
            int _Result = 0;
            StringBuilder sql = new StringBuilder();
            sql.AppendFormat("INSERT {0} (", tableName);
            string gjz = ")  VALUES (";
            StringBuilder column = new StringBuilder();
            StringBuilder values = new StringBuilder();
            foreach (KeyValuePair<string, string> var in columnAndValue)
            {
                column.AppendFormat("{0} ,", var.Key);
                values.AppendFormat("'{0}',", var.Value);
            }
            StringBuilder column2 = column.Remove(column.Length - 1, 1);
            StringBuilder values2 = values.Remove(values.Length - 1, 1);
            sql.AppendFormat("{0}{1}{2})", column2.ToString(), gjz, values2);
            sql.Append(" select @@IDENTITY");
            _Result = Convert.ToInt32(ExecuteScalar(CommandType.Text, sql.ToString()));
            //if (_Result > 0)
            //{
            //    InsertSqlLog(sql.ToString());
            //}
            return _Result;
        }
        //跟新指定表中的指定数据
        /// <summary>
        /// 跟新指定表中的指定数据
        /// </summary>
        /// <param name="trans">开启事物</param>
        /// <param name="tableName">表名</param>
        /// <param name="setValue">跟新列及数据</param>
        /// <param name="where">判断跟新条件</param>
        /// <returns></returns>
        public int updateToTable(DbTransaction trans, string tableName, string setValue, string where)
        {
            int _Result = 0;
            StringBuilder sql = new StringBuilder();
            sql.AppendFormat(" UPDATE  {0}  ", tableName);
            sql.AppendFormat(" SET  {0}", setValue);
            sql.AppendFormat(" where 1=1  {0}", where);
            _Result=ExecuteNonQuery(trans, CommandType.Text, sql.ToString());
            //if (_Result > 0)
            //{
            //    InsertSqlLog(sql.ToString());
            //}
            return _Result;
        }
        //跟新指定表中的指定数据
        /// <summary>
        /// 跟新指定表中的指定数据
        /// </summary>
        /// <param name="tableName">表名</param>
        /// <param name="setValue">跟新列及数据</param>
        /// <param name="where">判断跟新条件</param>
        /// <returns></returns>
        public int updateToTable(string tableName, string setValue, string where)
        {
            int _Result = 0;
            StringBuilder sql = new StringBuilder();
            sql.AppendFormat(" UPDATE  {0}  ", tableName);
            sql.AppendFormat(" SET  {0}", setValue);
            sql.AppendFormat(" where 1=1  {0}", where);
            _Result = ExecuteNonQuery(CommandType.Text, sql.ToString());
            //if (_Result > 0)
            //{
            //    InsertSqlLog(sql.ToString());
            //}
            return _Result;
        }
        //更新指定表的数据
        /// <summary>
        /// 更新指定表的数据
        /// </summary>
        /// <param name="updateValue">跟新字段</param>
        /// <param name="where">跟新判断条件</param>
        /// <returns>返回跟新影响的行数</returns>
        public int updateToTable(string tableName, Dictionary<string, string> updateValue, string where)
        {
            StringBuilder sql = new StringBuilder();

            foreach (KeyValuePair<string, string> var in updateValue)
            {
                sql.AppendFormat(" {0} = '{1}' , ", var.Key, var.Value);
            }

            StringBuilder values = sql.Remove(sql.Length - 2, 1);
            return updateToTable(tableName, values.ToString(), where);
        }
        //更新指定表的数据
        /// <summary>
        /// 更新指定表的数据
        /// </summary>
        /// <param name="trans">开启事物</param>
        /// <param name="tableName">表名</param>
        /// <param name="updateValue">跟新字段</param>
        /// <param name="where">跟新判断条件</param>
        /// <returns>返回跟新影响的行数</returns>
        public int updateToTable(DbTransaction trans, string tableName, Dictionary<string, string> updateValue, string where)
        {
            StringBuilder sql = new StringBuilder();

            foreach (KeyValuePair<string, string> var in updateValue)
            {
                sql.AppendFormat(" {0} = '{1}' , ", var.Key, var.Value);
            }

            StringBuilder values = sql.Remove(sql.Length - 2, 1);
            return updateToTable(trans, tableName, values.ToString(), where);
        }
        //指定条件删除指定表中的数据
        /// <summary>
        /// 指定条件删除指定表中的数据
        /// </summary>
        /// <param name="tableName">表名</param>
        /// <param name="where">删除条件</param>
        /// <returns></returns>
        public int delToTable(string tableName, string where)
        {
            int _Result=0;
            StringBuilder sql = new StringBuilder();
            sql.AppendFormat("DELETE FROM  {0} ", tableName);
            sql.AppendFormat("  WHERE 1=1  {0} ", where);
            _Result=ExecuteNonQuery(CommandType.Text, sql.ToString());
            //if (_Result > 0)
            //{
            //    InsertSqlLog(sql.ToString());
            //}
            return _Result;
        }
        //指定条件删除指定表中的数据
        /// <summary>
        /// 指定条件删除指定表中的数据
        /// </summary>
        /// <param name="trans">开启事物</param>
        /// <param name="tableName">表名</param>
        /// <param name="where">删除条件</param>
        /// <returns></returns>
        public int delToTable(DbTransaction trans, string tableName, string where)
        {
            StringBuilder sql = new StringBuilder();
            sql.AppendFormat("DELETE FROM  {0} ", tableName);
            sql.AppendFormat("  WHERE 1=1 {0} ", where);
            return ExecuteNonQuery(trans, CommandType.Text, sql.ToString());
        }
     
     
        /// 批量删除
        /// <summary>
        /// 批量删除
        /// </summary>
        /// <param name="trans">事务</param>
        /// <param name="updateValue">删除条件集合</param>
        /// <param name="Field">删除字段</param>
        /// <param name="tableName">表名</param>
        /// <returns></returns>
        public int delToTable(DbTransaction trans, Dictionary<int, string> updateValue, string Field, string tableName)
        {
            StringBuilder sql = new StringBuilder();
            sql.AppendFormat("DELETE FROM {0} WHERE {1} IN (", tableName, Field);
            foreach (KeyValuePair<int, string> var in updateValue)
            {

                sql.AppendFormat("'{0}' , ", var.Value);
            }
            StringBuilder values = sql.Remove(sql.Length - 2, 1);

            sql.AppendFormat(")");
            //InsertSqlLog(trans, sql.ToString());
            return ExecuteNonQuery(trans, CommandType.Text, sql.ToString());
        }

        //在表中检测数据是否存在
        /// <summary>
        /// 在表中检测数据是否存在
        /// </summary>
        /// <param name="tableName">表名</param>
        /// <param name="where">检测条件</param>
        /// <returns>不存在返回0，存在返回第一行的id</returns>
        public int checkToTable(string tableName, string where)
        {
            StringBuilder sql = new StringBuilder();
            sql.AppendFormat("select top 1 id from {0} where 1=1 {1} ", tableName, where);
            object rules = ExecuteScalar(CommandType.Text, sql.ToString());
            if (rules == null)
            {
                return 0;
            }
            else
            {
                return Convert.ToInt32(rules);
            }
        }
        //在表中检测数据是否存在
        /// <summary>
        /// 在表中检测数据是否存在
        /// </summary>
        /// <param name="trans">开启事物</param>
        /// <param name="tableName">表名</param>
        /// <param name="where">检测条件</param>
        /// <returns>不存在返回0，存在返回第一行的id</returns>
        public int checkToTable(DbTransaction trans, string tableName, string where)
        {
            StringBuilder sql = new StringBuilder();
            sql.AppendFormat("select top 1 id from {0} where 1=1 {1} ", tableName, where);
            object rules = ExecuteScalar(trans, CommandType.Text, sql.ToString());
            if (rules == null)
            {
                return 0;
            }
            else
            {
                return Convert.ToInt32(rules);
            }
        }
        /// <summary>
        /// 在表中统计数据条数
        /// </summary>
        /// <param name="tableName">表名</param>
        /// <param name="where">条件</param>
        /// <param name="filed">字段</param>
        /// <returns></returns>
        public int CountToTable(DbTransaction trans, string tableName, string where, string filed)
        {
            StringBuilder sql = new StringBuilder();
            sql.AppendFormat("select {2} from {0} where 1=1 {1} ", tableName, where, filed);
            DataSet ds = ExecuteDataSet(trans,CommandType.Text, sql.ToString());
            if (ds != null && ds.Tables[0].Rows.Count > 0)
            {
                return Convert.ToInt32(ds.Tables[0].Rows[0][0].ToString());
            }
            else
            {
                return 0;
            }
        }

        /// <summary>
        /// 在表中统计数据条数
        /// </summary>
        /// <param name="tableName">表名</param>
        /// <param name="where">条件</param>
        /// <param name="filed">字段</param>
        /// <returns></returns>
        public int CountToTable(string tableName, string where, string filed)
        {
            StringBuilder sql = new StringBuilder();
            sql.AppendFormat("select {2} from {0} where 1=1 {1} ", tableName, where, filed);
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
            if (System.Web.HttpContext.Current.Session["UserEntity"] != null)
            {
                BusinessCommon.UserManage.UserInfoLD _UserInfoSZ;
                _UserInfoSZ = (BusinessCommon.UserManage.UserInfoLD)System.Web.HttpContext.Current.Session["UserEntity"];
                _Where = ReturnRightsWhere(tableName, _UserInfoSZ.LoginName);

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
            sql.AppendFormat(" * from {0} where 1=1 {1}", tableName, where);
            sql.AppendFormat(" {0} ", string.IsNullOrEmpty(order) ? "" : "order by " + order);
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
            if (System.Web.HttpContext.Current.Session["UserEntity"]!= null)
            {
                BusinessCommon.UserManage.UserInfoLD _UserInfoSZ;
                _UserInfoSZ = (BusinessCommon.UserManage.UserInfoLD)System.Web.HttpContext.Current.Session["UserEntity"];
                _Where = ReturnRightsWhere(tableName, _UserInfoSZ.LoginName);
             
            }
            //获取该用户登陆的查询SQL语句

            string sql = string.Format("select {0} {1} from {2} where 1=1 {3} ", distinct, searchColumn, tableName, _Where + where);
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

        //条件查询表中某列的数据
        /// <summary>
        /// 条件查询表中某列的数据
        /// </summary>
        /// <param name="trans">开启事物</param>
        /// <param name="tableName">表名</param>
        /// <param name="searchColumn">查询列名</param>
        /// <param name="where">判断条件</param>
        /// <param name="distinct">是否消除重复(消除重复distinct ,不消除“”)</param>
        /// <returns>DataSet</returns>
        public DataSet searchToTable(DbTransaction trans, string tableName, string searchColumn, string where, string distinct)
        {

            string sql = string.Format("select {0} {1} from {2} where 1=1 {3} ", distinct, searchColumn, tableName, where);
            return ExecuteDataSet(trans, CommandType.Text, sql);
        }
        // 执行存储过程查询
        /// <summary>
        /// 执行存储过程查询
        /// </summary>
        /// <param name="trans">开启事物</param>
        /// <param name="where">条件</param>
        /// <returns></returns>
        public DataSet searchToTable(DbTransaction trans, string where)
        {

            string sql = string.Format("{0}", where);
            return ExecuteDataSet(trans, CommandType.Text, sql);
        }
        public DataSet searchToTable(string where)
        {

            string sql = string.Format("{0}", where);
            return ExecuteDataSet(CommandType.Text, sql);
        }
        //条件查询整个表数据
        /// <summary>
        /// 条件查询整个表数据
        /// </summary>
        /// <param name="tableName">表名</param>
        /// <param name="where">查询条件</param>
        /// <param name="top">显示条数</param>
        /// <param name="order">排序方式</param>
        /// <returns>SqlDataReader</returns>
        public IDataReader getReaderToTable(string tableName, string where, string top, string order)
        {
            StringBuilder sql = new StringBuilder();
            sql.AppendFormat("select {0}", string.IsNullOrEmpty(top) ? "" : "top " + top);
            sql.AppendFormat(" * from {0} where 1=1 {1}", tableName, where);
            sql.AppendFormat(" {0} ", string.IsNullOrEmpty(order) ? "" : "order by " + order);
            return ExecuteReader(CommandType.Text, sql.ToString());
        }
        //条件查询整个表数据
        /// <summary>
        /// 条件查询整个表数据
        /// </summary>
        /// <param name="trans">开启事物</param>
        /// <param name="tableName">表名</param>
        /// <param name="where">查询条件</param>
        /// <param name="top">显示条数</param>
        /// <param name="order">排序方式</param>
        /// <returns>SqlDataReader</returns>
        public IDataReader getReaderToTable(DbTransaction trans, string tableName, string where, string top, string order)
        {
            StringBuilder sql = new StringBuilder();
            sql.AppendFormat("select {0}", string.IsNullOrEmpty(top) ? "" : "top " + top);
            sql.AppendFormat(" * from {0} where 1=1 {1}", tableName, where);
            sql.AppendFormat(" {0} ", string.IsNullOrEmpty(order) ? "" : "order by " + order);
            return ExecuteReader(trans, CommandType.Text, sql.ToString());
        }
        //条件查询表中某列的数据
        /// <summary>
        /// 条件查询表中某列的数据
        /// </summary>
        /// <param name="tableName">表名</param>
        /// <param name="searchColumn">查询列名</param>
        /// <param name="where">判断条件</param>
        /// <param name="distinct">是否消除重复(消除重复distinct ,不消除“”)</param>
        /// <returns>SqlDataReader</returns>
        public IDataReader searchReaderToTable(string tableName, string searchColumn, string where, string distinct)
        {
            string sql = string.Format("select {0} {1} from {2} where 1=1 {3} ", distinct, searchColumn, tableName, where);
            return ExecuteReader(CommandType.Text, sql);
        }
        //条件查询表中某列的数据
        /// <summary>
        /// 条件查询表中某列的数据
        /// </summary>
        /// <param name="trans">开启事物</param>
        /// <param name="tableName">表名</param>
        /// <param name="searchColumn">查询列名</param>
        /// <param name="where">判断条件</param>
        /// <param name="distinct">是否消除重复(消除重复distinct ,不消除“”)</param>
        /// <returns>SqlDataReader</returns>
        public IDataReader searchReaderToTable(DbTransaction trans, string tableName, string searchColumn, string where, string distinct)
        {
            string sql = string.Format("select {0} {1} from {2} where 1=1 {3} ", distinct, searchColumn, tableName, where);
            return ExecuteReader(trans, CommandType.Text, sql);
        }
        #endregion
        //更新视图
        /// <summary>
        /// 更新视图
        /// </summary>
        /// <param name="tableName">视图名</param>
        /// <param name="setValue">跟新列及数据</param>
        /// <param name="where">判断跟新条件</param>
        /// <returns></returns>
        public int updateToView(string viewName, string updateValue)
        {
            StringBuilder sql = new StringBuilder();
            sql.AppendFormat(" ALTER VIEW  {0}  ", viewName);
            sql.AppendFormat(" as  {0}", updateValue);

            return ExecuteNonQuery(CommandType.Text, sql.ToString());
        }
        /// <summary>
        /// 直接运行存储过程得到数据
        /// </summary>
        /// <returns></returns>
        public DataSet GetProc(string ProcSQL)
        {
            return this.ExecuteDataSet(CommandType.Text, ProcSQL);
        }
        /// <summary>
        /// 直接运行存储过程得到数据
        /// </summary>
        /// <returns></returns>
        public DataSet GetProc(DbTransaction trans,string ProcSQL)
        {
            return this.ExecuteDataSet(trans,CommandType.Text, ProcSQL);
        }
        /// <summary>
        /// 直接运行SQL的函数
        /// </summary>
        /// <param name="trans"></param>
        /// <param name="ProcSQL"></param>
        /// <returns></returns>
        public int ExecuteSQL(DbTransaction trans,string ProcSQL)
        {
            return this.ExecuteNonQuery(trans,CommandType.Text, ProcSQL);
        }
        /// <summary>
        /// 直接运行SQL的函数
        /// </summary>
        /// <param name="trans"></param>
        /// <param name="ProcSQL"></param>
        /// <returns></returns>
        public int ExecuteSQL(string ProcSQL)
        {
            return this.ExecuteNonQuery(CommandType.Text, ProcSQL);
        }
        /// <summary>
        /// 导入服务器的数据专用
        /// </summary>
        /// <param name="trans"></param>
        /// <param name="tableName"></param>
        /// <param name="columnAndValue"></param>
        /// <returns></returns>
        public int insertToTableImport(DbTransaction trans, string tableName, Dictionary<string, string> columnAndValue)
        {
            StringBuilder sql = new StringBuilder();
            sql.AppendFormat("INSERT {0} (", tableName);
            string gjz = ")  VALUES (";
            StringBuilder column = new StringBuilder();
            StringBuilder values = new StringBuilder();
            foreach (KeyValuePair<string, string> var in columnAndValue)
            {
                column.AppendFormat("{0} ,", var.Key);
                values.AppendFormat("'{0}' ,", var.Value);
            }
            StringBuilder column2 = column.Remove(column.Length - 1, 1);
            StringBuilder values2 = values.Remove(values.Length - 1, 1);
            sql.AppendFormat("{0}{1}{2})", column2.ToString(), gjz, values2);
            sql.Append(" select @@IDENTITY");

            object row = ExecuteScalar(trans, CommandType.Text, sql.ToString());
            if (row != null && row != DBNull.Value)
            {
                return Convert.ToInt32(row);
            }
            else
            {
                throw new InvalidOperationException("数据库操作失败！");
            }

        }

        /// <summary>
        /// 导入服务器的数据专用
        /// </summary>
        /// <param name="trans"></param>
        /// <param name="tableName"></param>
        /// <param name="setValue"></param>
        /// <param name="where"></param>
        /// <returns></returns>
        public int updateToTableImport(DbTransaction trans, string tableName, string setValue, string where)
        {
            int _Result = 0;
            StringBuilder sql = new StringBuilder();
            sql.AppendFormat(" UPDATE  {0}  ", tableName);
            sql.AppendFormat(" SET  {0}", setValue);
            sql.AppendFormat(" where 1=1  {0}", where);
            _Result = ExecuteNonQuery(trans, CommandType.Text, sql.ToString());
            return _Result;
        }

        public int updateToTableImport(string tableName, Dictionary<string, string> updateValue, string where)
        {
            StringBuilder sql = new StringBuilder();

            foreach (KeyValuePair<string, string> var in updateValue)
            {
                sql.AppendFormat(" {0} = '{1}' , ", var.Key, var.Value);
            }

            StringBuilder values = sql.Remove(sql.Length - 2, 1);
            return updateToTable(tableName, values.ToString(), where);
        }
    }
}
