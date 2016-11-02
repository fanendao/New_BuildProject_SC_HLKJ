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

    /// ������Ϣ���ݷ��ʲ���
    /// <summary>
    /// ������Ϣ���ݷ��ʲ���
    /// </summary>
    public class BasicDAL : DataAccessBase
    { 
        #region ������

        /// ����������ݼ�����
        /// <summary>
        /// ����������ݼ�����
        /// </summary>
        /// <param name="trans">����</param>
        /// <param name="TableName">����</param>
        /// <param name="FieldValue">���ݼ�</param>
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

        /// ����������ݼ�����
        /// <summary>
        /// ����������ݼ�����
        /// </summary>
        /// <param name="trans">����</param>
        /// <param name="TableName">����</param>
        /// <param name="FieldValue">���ݼ�</param>
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
                    arr_Values = var.Value.ToString().Trim().Split('�k'); 
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

        /// ����������ݼ�����
        /// <summary>
        /// ����������ݼ�����
        /// </summary>
        /// <param name="trans">����</param>
        /// <param name="TableName">����</param>
        /// <param name="FieldValue">���ݼ�</param>
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

        /// ���ݼ�����
        /// <summary>
        /// ���ݼ�����
        /// </summary>
        /// <param name="trans">����</param>
        /// <param name="TableName">����</param>
        /// <param name="FieldValue">���ݼ�</param>
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

        /// ���ݼ�����
        /// <summary>
        /// ���ݼ�����
        /// </summary>
        /// <param name="TableName">����</param>
        /// <param name="FieldValue">���ݼ�</param>
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
                    arr_Values = var.Value.ToString().Trim().Split('�k');
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

        /// ���ݼ�����
        /// <summary>
        /// ���ݼ�����
        /// </summary>
        /// <param name="TableName">����</param>
        /// <param name="FieldValue">���ݼ�</param>
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

        /// ��������
        /// <summary>
        /// ��������
        /// </summary>
        /// <param name="trans">����</param>
        /// <param name="TableName">����</param>
        /// <param name="Field">�ֶ���</param>
        /// <param name="Value">����ֵ, ��VALUES</param>
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

        /// ��������
        /// <summary>
        /// ��������
        /// </summary>
        /// <param name="TableName">����</param>
        /// <param name="Field">�ֶ���</param>
        /// <param name="Value">����ֵ, ��VALUES</param>
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

        /// ��������
        /// <summary>
        /// ��������
        /// </summary>
        /// <param name="trans">����</param>
        /// <param name="Value">����ֵ</param>
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

        /// ��������
        /// <summary>
        /// ��������
        /// </summary>
        /// <param name="Value">����ֵ</param>
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

        #region �޸���

        /// ��������
        /// <summary>
        /// ��������
        /// </summary>
        /// <param name="Where">����</param>
        /// <returns></returns>
        public int UpdateToTable(string Where)
        {
            StringBuilder sql = new StringBuilder();
            sql.AppendFormat("{0}", Where);
            return ExecuteNonQuery(CommandType.Text, sql.ToString());
        }

        /// ��������
        /// <summary>
        /// ��������
        /// </summary>
        /// <param name="trans">����</param>
        /// <param name="TableName">����</param>
        /// <param name="Value">����������</param>
        /// <param name="Where">����</param>
        /// <returns></returns>
        public int UpdateToTable(DbTransaction trans, string Where)
        {
            StringBuilder sql = new StringBuilder();
            sql.AppendFormat("{0}", Where);
            return ExecuteNonQuery(trans, CommandType.Text, sql.ToString());
        }

        /// ��������
        /// <summary>
        /// ��������
        /// </summary>
        /// <param name="TableName">����</param>
        /// <param name="Value">����������</param>
        /// <param name="Where">����</param>
        /// <returns></returns>
        public int UpdateToTable(string TableName, string Value, string Where)
        {
            StringBuilder sql = new StringBuilder();
            sql.AppendFormat(" UPDATE  {0}  ", TableName);
            sql.AppendFormat(" SET  {0}", Value);
            sql.AppendFormat(" where 1=1  {0}", Where);
            return ExecuteNonQuery(CommandType.Text, sql.ToString());
        }

        /// ��������
        /// <summary>
        /// ��������
        /// </summary>
        /// <param name="trans">����</param>
        /// <param name="TableName">����</param>
        /// <param name="Value">����������</param>
        /// <param name="Where">����</param>
        /// <returns></returns>
        public int UpdateToTable(DbTransaction trans, string TableName, string Value, string Where)
        {
            StringBuilder sql = new StringBuilder();
            sql.AppendFormat(" UPDATE  {0}  ", TableName);
            sql.AppendFormat(" SET  {0}", Value);
            sql.AppendFormat(" where 1=1  {0}", Where);
            return ExecuteNonQuery(trans, CommandType.Text, sql.ToString());
        }

        /// ���ݼ�����
        /// <summary>
        /// ���ݼ�����
        /// </summary>
        /// <param name="TableName">����</param>
        /// <param name="FieldValue">���ݼ�</param>
        /// <param name="Where">����</param>
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

        /// ���ݼ�����
        /// <summary>
        /// ���ݼ�����
        /// </summary>
        /// <param name="TableName">����</param>
        /// <param name="FieldValue">���ݼ�</param>
        /// <param name="Where">����</param>
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
                    arr_Values = var.Value.ToString().Trim().Split('�k');
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

        /// ���ݼ�����
        /// <summary>
        /// ���ݼ�����
        /// </summary>
        /// <param name="trans">����</param>
        /// <param name="TableName">����</param>
        /// <param name="FieldValue">���ݼ�</param>
        /// <param name="Where">����</param>
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

        /// ����������ݼ�����
        /// <summary>
        /// ����������ݼ�����
        /// </summary>
        /// <param name="trans">����</param>
        /// <param name="TableName">����</param>
        /// <param name="FieldValue">���ݼ�</param>
        /// <param name="Where">����</param>
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

        /// ����������ݼ�����
        /// <summary>
        /// ����������ݼ�����
        /// </summary>
        /// <param name="trans">����</param>
        /// <param name="TableName">����</param>
        /// <param name="FieldValue">���ݼ�</param>
        /// <param name="Where">����</param>
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
                    arr_Values = var.Value.ToString().Trim().Split('�k');
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

        /// ����������ݼ�����
        /// <summary>
        /// ����������ݼ�����
        /// </summary>
        /// <param name="trans">����</param>
        /// <param name="TableName">����</param>
        /// <param name="FieldValue">���ݼ�</param>
        /// <param name="Where">����</param>
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

        #region ɾ����

        /// ɾ��
        /// <summary>
        /// ɾ��
        /// </summary>
        /// <param name="Where">����</param>
        /// <returns></returns>
        public int DelToTable(string Where)
        {
            StringBuilder sql = new StringBuilder();
            sql.AppendFormat("{0} ", Where);
            return ExecuteNonQuery(CommandType.Text, sql.ToString());
        }

        /// �������ɾ��
        /// <summary>
        /// �������ɾ��
        /// </summary>
        /// <param name="trans">����</param>
        /// <param name="Where">����</param>
        /// <returns></returns>
        public int DelToTable(DbTransaction trans, string Where)
        {
            StringBuilder sql = new StringBuilder();
            sql.AppendFormat(" {0} ", Where);
            return ExecuteNonQuery(trans, CommandType.Text, sql.ToString());
        }

        /// ɾ��
        /// <summary>
        /// ɾ��
        /// </summary>
        /// <param name="TableName">����</param>
        /// <param name="Where">����</param>
        /// <returns></returns>
        public int DelToTable(string TableName, string Where)
        {
            StringBuilder sql = new StringBuilder();
            sql.AppendFormat("DELETE FROM  {0} ", TableName);
            sql.AppendFormat("  WHERE 1=1 {0} ", Where);
            return ExecuteNonQuery(CommandType.Text, sql.ToString());
        }

        /// �������ɾ��
        /// <summary>
        /// �������ɾ��
        /// </summary>
        /// <param name="trans">����</param>
        /// <param name="TableName">����</param>
        /// <param name="Where">����</param>
        /// <returns></returns>
        public int DelToTable(DbTransaction trans, string TableName, string Where)
        {
            StringBuilder sql = new StringBuilder();
            sql.AppendFormat("DELETE FROM  {0} ", TableName);
            sql.AppendFormat("  WHERE 1=1 {0} ", Where);
            return ExecuteNonQuery(trans, CommandType.Text, sql.ToString());
        }

        /// ����ɾ����ͬ��
        /// <summary>
        /// ����ɾ����ͬ��
        /// </summary>
        /// <param name="TableName">ɾ������</param>
        /// <param name="tableName">����</param>
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

        /// ����ɾ����ͬ��
        /// <summary>
        /// ����ɾ����ͬ��
        /// </summary>
        /// <param name="trans">����</param>
        /// <param name="TableName">ɾ������</param>
        /// <param name="tableName">����</param>
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

        /// ɾ��
        /// <summary>
        /// ɾ��
        /// </summary>
        /// <param name="updateValue">ɾ����������</param>
        /// <param name="Field">ɾ���ֶ�</param>
        /// <param name="tableName">����</param>
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

        /// ɾ��
        /// <summary>
        /// ɾ��
        /// </summary>
        /// <param name="trans">����</param>
        /// <param name="updateValue">ɾ����������</param>
        /// <param name="Field">ɾ���ֶ�</param>
        /// <param name="tableName">����</param>
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

        #region ��ѯ��(����bool,int,string,DataSet)

        /// �ڱ����Ƿ����
        /// <summary>
        /// �ڱ����Ƿ����
        /// </summary>
        /// <param name="tableName">����</param>
        /// <param name="where">�������</param>
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

        /// �ڱ����Ƿ����
        /// <summary>
        /// �ڱ����Ƿ����
        /// </summary>
        /// <param name="tableName">����</param>
        /// <param name="where">�������</param>
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

        /// �ڱ����Ƿ����
        /// <summary>
        /// �ڱ����Ƿ����
        /// </summary>
        /// <param name="trans">����</param>
        /// <param name="tableName">����</param>
        /// <param name="where">�������</param>
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

        /// �ڱ����Ƿ����
        /// <summary>
        /// �ڱ����Ƿ����
        /// </summary>
        /// <param name="trans">����</param>
        /// <param name="tableName">����</param>
        /// <param name="where">�������</param>
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

        /// �ڱ���ͳ����������
        /// <summary>
        /// �ڱ���ͳ����������
        /// </summary>
        /// <param name="tableName">����</param>
        /// <param name="where">����</param>
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

        /// �ڱ���ͳ����������
        /// <summary>
        /// �ڱ���ͳ����������
        /// </summary>
        /// <param name="tableName">����</param>
        /// <param name="where">����</param>
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

        /// �ڱ���ĳ�ֶ�ͳ����������
        /// <summary>
        /// �ڱ���ĳ�ֶ�ͳ����������
        /// </summary>
        /// <param name="tableName">����</param>
        /// <param name="where">����</param>
        /// <param name="filed">�ֶ�</param>
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

        /// �ڱ���ĳ�ֶ�ͳ����������
        /// <summary>
        /// �ڱ���ĳ�ֶ�ͳ����������
        /// </summary>
        /// <param name="tableName">����</param>
        /// <param name="where">����</param>
        /// <param name="filed">�ֶ�</param>
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

        /// �ڱ���ĳ�ֶ�ͳ����������
        /// <summary>
        /// �ڱ���ĳ�ֶ�ͳ����������
        /// </summary>
        /// <param name="tableName">����</param>
        /// <param name="where">����</param>
        /// <param name="filed">�ֶ�</param>
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

        /// �ڱ���ĳ�ֶ�ͳ����������
        /// <summary>
        /// �ڱ���ĳ�ֶ�ͳ����������
        /// </summary>
        /// <param name="tableName">����</param>
        /// <param name="where">����</param>
        /// <param name="filed">�ֶ�</param>
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

        /// �ڱ���ĳ�ֶ�ͳ����������
        /// <summary>
        /// �ڱ���ĳ�ֶ�ͳ����������
        /// </summary>
        /// <param name="tableName">����</param>
        /// <param name="where">����</param>
        /// <param name="filed">�ֶ�</param>
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

        /// �ڱ���ĳ�ֶ�ͳ����������
        /// <summary>
        /// �ڱ���ĳ�ֶ�ͳ����������
        /// </summary>
        /// <param name="tableName">����</param>
        /// <param name="where">����</param>
        /// <param name="filed">�ֶ�</param>
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

        /// �ڱ���ĳ�ֶε�ֵ
        /// <summary>
        /// �ڱ���ĳ�ֶε�ֵ
        /// </summary>
        /// <param name="tableName">����</param>
        /// <param name="where">����</param>
        /// <param name="filed">�ֶ�</param>
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

        /// �ڱ���ĳ�ֶε�ֵ
        /// <summary>
        /// �ڱ���ĳ�ֶε�ֵ
        /// </summary>
        /// <param name="tableName">����</param>
        /// <param name="where">����</param>
        /// <param name="filed">�ֶ�</param>
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

        /// ������ѯ�����е�����
        /// <summary>
        /// ������ѯ�����е�����
        /// </summary>
        /// <param name="TableName">����</param>
        /// <param name="Column">����</param>
        /// <param name="Where">����</param>
        /// <returns></returns>
        public DataSet SearchToTable(string TableName, string Where)
        {
            StringBuilder sql = new StringBuilder();
            sql.AppendFormat("select * from {0}  where 1=1 {1}", TableName, DataRightsWhere(TableName) + Where);

            return ExecuteDataSet(CommandType.Text, sql.ToString());
        }

        /// ������ѯ�����е�����
        /// <summary>
        /// ������ѯ�����е�����
        /// </summary>
        /// <param name="trans">����</param>
        /// <param name="TableName">����</param>
        /// <param name="Column">����</param>
        /// <param name="Where">����</param>
        /// <returns>DataSet</returns>
        public DataSet SearchToTable(DbTransaction trans, string TableName, string Where)
        {
            StringBuilder sql = new StringBuilder();
            sql.AppendFormat("select * from {0}  where 1=1 {1}", TableName, DataRightsWhere(TableName) + Where);

            return ExecuteDataSet(trans, CommandType.Text, sql.ToString());
        }

        /// ������ѯ�����е�����
        /// <summary>
        /// ������ѯ�����е�����
        /// </summary>
        /// <param name="TableName">����</param>
        /// <param name="Column">����</param>
        /// <param name="Where">����</param>
        /// <returns></returns>
        public DataSet SearchToTable(string TableName, string Column, string Where)
        {
            StringBuilder sql = new StringBuilder();
            sql.AppendFormat("select {0} from {1} where 1=1 {2}", Column, TableName, DataRightsWhere(TableName) + Where);

            return ExecuteDataSet(CommandType.Text, sql.ToString());
        }

        /// ������ѯ�����е�����
        /// <summary>
        /// ������ѯ�����е�����
        /// </summary>
        /// <param name="trans">����</param>
        /// <param name="TableName">����</param>
        /// <param name="Column">����</param>
        /// <param name="Where">����</param>
        /// <returns>DataSet</returns>
        public DataSet SearchToTable(DbTransaction trans, string TableName, string Column, string Where)
        {
            StringBuilder sql = new StringBuilder();
            sql.AppendFormat("select {0} from {1} where 1=1 {2}", Column, TableName, DataRightsWhere(TableName) + Where);

            return ExecuteDataSet(trans, CommandType.Text, sql.ToString());
        }

        /// ������ѯ�����е�����
        /// <summary>
        /// ������ѯ�����е�����
        /// </summary>
        /// <param name="Where">����</param>
        /// <returns></returns>
        public DataSet SearchToTable(string Where)
        {
            StringBuilder sql = new StringBuilder();
            sql.AppendFormat("{0}", Where);

            return ExecuteDataSet(CommandType.Text, sql.ToString());
        }

        /// ������ѯ�����е�����
        /// <summary>
        /// ������ѯ�����е�����
        /// </summary>
        /// <param name="trans">����</param>
        /// <param name="Where">����</param>
        /// <returns>DataSet</returns>
        public DataSet SearchToTable(DbTransaction trans, string Where)
        {
            StringBuilder sql = new StringBuilder();
            sql.AppendFormat("{0}", Where);

            return ExecuteDataSet(trans, CommandType.Text, sql.ToString());
        }

        /// ������ѯ�����е�����(����)
        /// <summary>
        /// ������ѯ�����е�����(����)
        /// </summary>
        /// <param name="TableName">����</param>
        /// <param name="Column">����</param>
        /// <param name="Where">����</param>
        /// <param name="Order">����</param>
        /// <returns></returns>
        public DataSet SearchToTable(string TableName, string Column, string Where, string Order)
        {
            StringBuilder sql = new StringBuilder();
            sql.AppendFormat("select {0} from {1}  where 1=1 {2} ORDER BY {3}", Column, TableName, DataRightsWhere(TableName) + Where, Order);

            return ExecuteDataSet(CommandType.Text, sql.ToString());
        }

        /// ������ѯ�����е�����(����)
        /// <summary>
        /// ������ѯ�����е�����(����)
        /// </summary>
        /// <param name="trans">����</param>
        /// <param name="TableName">����</param>
        /// <param name="Column">����</param>
        /// <param name="Where">����</param>
        /// <param name="Order">����</param>
        /// <returns>DataSet</returns>
        public DataSet SearchToTable(DbTransaction trans, string TableName, string Column, string Where, string Order)
        {
            StringBuilder sql = new StringBuilder();
            sql.AppendFormat("select {0} from {1} where 1=1 {2} ORDER BY {3}", Column, TableName, DataRightsWhere(TableName) + Where, Order);

            return ExecuteDataSet(trans, CommandType.Text, sql.ToString());
        }

        //������ѯ����ĳ�е�����
        /// <summary>
        /// ������ѯ����ĳ�е�����
        /// </summary>
        /// <param name="tableName">����</param>
        /// <param name="searchColumn">��ѯ����</param>
        /// <param name="where">�ж�����</param>
        /// <param name="distinct">�Ƿ������ظ�(�����ظ�distinct ,����������)</param>
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
        /// �����¼���ͱ����õ���ѯ��SQLWhere�������
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
        /// ������ѯ�����е�����(ȡΨһ)
        /// <summary>
        /// ������ѯ�����е�����(ȡΨһ)
        /// </summary>
        /// <param name="TableName">����</param>
        /// <param name="Column">����</param>
        /// <param name="Where">����</param>
        /// <returns></returns>
        public DataSet DistinctToTable(string TableName, string Column, string Where)
        {
            StringBuilder sql = new StringBuilder();
            sql.AppendFormat("select Distinct {0} from {1} where 1=1 {2}", Column, TableName, DataRightsWhere(TableName) + Where);

            return ExecuteDataSet(CommandType.Text, sql.ToString());
        }

        /// ������ѯ�����е�����(ȡΨһ)
        /// <summary>
        /// ������ѯ�����е�����(ȡΨһ)
        /// </summary>
        /// <param name="trans">����</param>
        /// <param name="TableName">����</param>
        /// <param name="Column">����</param>
        /// <param name="Where">����</param>
        /// <returns>DataSet</returns>
        public DataSet DistinctToTable(DbTransaction trans, string TableName, string Column, string Where)
        {
            StringBuilder sql = new StringBuilder();
            sql.AppendFormat("select Distinct {0} from {1} where 1=1 {2}", Column, TableName, DataRightsWhere(TableName) + Where);

            return ExecuteDataSet(trans, CommandType.Text, sql.ToString());
        }

        /// ������ѯ�����е�����(ȡΨһ������)
        /// <summary>
        /// ������ѯ�����е�����(ȡΨһ������)
        /// </summary>
        /// <param name="TableName">����</param>
        /// <param name="Column">����</param>
        /// <param name="Where">����</param>
        /// <param name="Order">����</param>
        /// <returns></returns>
        public DataSet DistinctToTable(string TableName, string Column, string Where, string Order)
        {
            StringBuilder sql = new StringBuilder();
            sql.AppendFormat("select Distinct {0} from {1} where 1=1 {2} ORDER BY {3}", Column, DataRightsWhere(TableName) + Where, Where, Order);

            return ExecuteDataSet(CommandType.Text, sql.ToString());
        }

        /// ������ѯ�����е�����(ȡΨһ������)
        /// <summary>
        /// ������ѯ�����е�����(ȡΨһ������)
        /// </summary>
        /// <param name="TableName">����</param>
        /// <param name="Column">����</param>
        /// <param name="Where">����</param>
        /// <param name="Order">����</param>
        /// <returns></returns>
        public DataSet DistinctToTable2(string TableName, string Column, string Where, string Order)
        {
            StringBuilder sql = new StringBuilder();
            sql.AppendFormat("select Distinct {0} from {1} where 1=1 {2} ORDER BY {3}", Column, TableName, DataRightsWhere(TableName) + Where, Order);

            return ExecuteDataSet(CommandType.Text, sql.ToString());
        }

        /// ������ѯ�����е�����(ȡΨһ������)
        /// <summary>
        /// ������ѯ�����е�����(ȡΨһ������)
        /// </summary>
        /// <param name="trans">����</param>
        /// <param name="TableName">����</param>
        /// <param name="Column">����</param>
        /// <param name="Where">����</param>
        /// <param name="Order">����</param>
        /// <returns>DataSet</returns>
        public DataSet DistinctToTable(DbTransaction trans, string TableName, string Column, string Where, string Order)
        {
            StringBuilder sql = new StringBuilder();
            sql.AppendFormat("select Distinct {0} from {1} where 1=1 {2} ORDER BY {3}", Column, TableName,DataRightsWhere(TableName)+Where, Order);

            return ExecuteDataSet(trans, CommandType.Text, sql.ToString());
        }

        //������ѯ����������
        /// <summary>
        /// ������ѯ����������
        /// </summary>
        /// <param name="tableName">����</param>
        /// <param name="where">��ѯ����</param>
        /// <param name="top">��ʾ����</param>
        /// <param name="order">����ʽ</param>
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




        //������ѯ����������
        /// <summary>
        /// ������ѯ����������
        /// </summary>
        /// <param name="tableName">����</param>
        /// <param name="where">��ѯ����</param>
        /// <param name="top">��ʾ����</param>
        /// <param name="order">����ʽ</param>
        /// <returns>DataSet</returns>
        public DataSet selectToTable_New(string tableName, string where)
        {
            StringBuilder sql = new StringBuilder();
            sql.AppendFormat("select top 1");
            sql.AppendFormat(" * from {0} where 1=1 {1}", tableName, where);
            return ExecuteDataSet(CommandType.Text, sql.ToString());
        }





        /// <summary>
        /// ����Ȩ�޴���
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
        //������ѯ����������
        /// <summary>fed
        /// ������ѯ����������
        /// </summary>
        /// <param name="trans">��������</param>
        /// <param name="tableName">����</param>
        /// <param name="where">��ѯ����</param>
        /// <param name="top">��ʾ����</param>
        /// <param name="order">����ʽ</param>
        /// <returns>DataSet</returns>
        public DataSet selectToTable(DbTransaction trans, string tableName, string where, string top, string order)
        {
            StringBuilder sql = new StringBuilder();
            sql.AppendFormat("select {0}", string.IsNullOrEmpty(top) ? "" : "top " + top);
            sql.AppendFormat(" * from {0} where 1=1 {1}", tableName, DataRightsWhere(tableName) + where);
            sql.AppendFormat(" {0} ", string.IsNullOrEmpty(order) ? "" : "order by " + order);
            return ExecuteDataSet(trans, CommandType.Text, sql.ToString());
        }

        /// ֱ�����д洢���̵õ�����
        /// <summary>
        /// ֱ�����д洢���̵õ�����
        /// ----fed
        /// </summary>
        /// <returns></returns>
        public DataSet GetProc(string ProcSQL)
        {
            return this.ExecuteDataSet(CommandType.Text, ProcSQL);
        }

        /// ֱ�����д洢���̵õ�����
        /// <summary>
        /// ֱ�����д洢���̵õ�����
        /// ----fed
        /// </summary>
        ///<returns>����</returns>
        /// <returns></returns>
        public DataSet GetProc(DbTransaction trans, string ProcSQL)
        {
            return this.ExecuteDataSet(trans, CommandType.Text, ProcSQL);
        }

        #endregion

        #region ��ѯ��(����IDataReader)

        /// ������ѯ�����е�����
        /// <summary>
        /// ������ѯ�����е�����
        /// </summary>
        /// <param name="TableName">����</param>
        /// <param name="Column">����</param>
        /// <param name="Where">����</param>
        /// <returns></returns>
        public IDataReader ReaderToTable(string TableName, string Column, string Where)
        {
            StringBuilder sql = new StringBuilder();
            sql.AppendFormat("select {0} from {1} where 1=1 {2}", Column, TableName, DataRightsWhere(TableName) + Where);

            return ExecuteReader(CommandType.Text, sql.ToString());
        }

        /// ������ѯ�����е�����
        /// <summary>
        /// ������ѯ�����е�����
        /// </summary>
        /// <param name="trans">����</param>
        /// <param name="TableName">����</param>
        /// <param name="Column">����</param>
        /// <param name="Where">����</param>
        /// <returns>DataSet</returns>
        public IDataReader ReaderToTable(DbTransaction trans, string TableName, string Column, string Where)
        {
            StringBuilder sql = new StringBuilder();
            sql.AppendFormat("select {0} from {1} where 1=1 {2}", Column, TableName, DataRightsWhere(TableName) + Where);

            return ExecuteReader(trans, CommandType.Text, sql.ToString());
        }

        /// ������ѯ�����е�����
        /// <summary>
        /// ������ѯ�����е�����
        /// </summary>
        /// <param name="Where">����</param>
        /// <returns></returns>
        public IDataReader ReaderToTable(string Where)
        {
            StringBuilder sql = new StringBuilder();
            sql.AppendFormat("{0}", Where);

            return ExecuteReader(CommandType.Text, sql.ToString());
        }

        /// ������ѯ�����е�����
        /// <summary>
        /// ������ѯ�����е�����
        /// </summary>
        /// <param name="trans">����</param>
        /// <param name="Where">����</param>
        /// <returns>DataSet</returns>
        public IDataReader ReaderToTable(DbTransaction trans, string Where)
        {
            StringBuilder sql = new StringBuilder();
            sql.AppendFormat("{0}", Where);

            return ExecuteReader(trans, CommandType.Text, sql.ToString());
        }

        /// ������ѯ�����е�����(����)
        /// <summary>
        /// ������ѯ�����е�����(����)
        /// </summary>
        /// <param name="TableName">����</param>
        /// <param name="Column">����</param>
        /// <param name="Where">����</param>
        /// <param name="Order">����</param>
        /// <returns></returns>
        public IDataReader ReaderToTable(string TableName, string Column, string Where, string Order)
        {
            StringBuilder sql = new StringBuilder();
            sql.AppendFormat("select {0} from {1} where 1=1 {2} ORDER BY {3}", Column, TableName, DataRightsWhere(TableName) + Where, Order);

            return ExecuteReader(CommandType.Text, sql.ToString());
        }

        /// ������ѯ�����е�����(����)
        /// <summary>
        /// ������ѯ�����е�����(����)
        /// </summary>
        /// <param name="trans">����</param>
        /// <param name="TableName">����</param>
        /// <param name="Column">����</param>
        /// <param name="Where">����</param>
        /// <param name="Order">����</param>
        /// <returns>DataSet</returns>
        public IDataReader ReaderToTable(DbTransaction trans, string TableName, string Column, string Where, string Order)
        {
            StringBuilder sql = new StringBuilder();
            sql.AppendFormat("select {0} from {1} where 1=1 {2} ORDER BY {3}", Column, TableName, DataRightsWhere(TableName) + Where, Order);

            return ExecuteReader(trans, CommandType.Text, sql.ToString());
        }

        /// ������ѯ�����е�����(ȡΨһ)
        /// <summary>
        /// ������ѯ�����е�����(ȡΨһ)
        /// </summary>
        /// <param name="TableName">����</param>
        /// <param name="Column">����</param>
        /// <param name="Where">����</param>
        /// <returns></returns>
        public IDataReader DistinctReader(string TableName, string Column, string Where)
        {
            StringBuilder sql = new StringBuilder();
            sql.AppendFormat("select Distinct {0} from {1} where 1=1 {2}", Column, TableName, Where);

            return ExecuteReader(CommandType.Text, sql.ToString());
        }

        /// ������ѯ�����е�����(ȡΨһ)
        /// <summary>
        /// ������ѯ�����е�����(ȡΨһ)
        /// </summary>
        /// <param name="trans">����</param>
        /// <param name="TableName">����</param>
        /// <param name="Column">����</param>
        /// <param name="Where">����</param>
        /// <returns>DataSet</returns>
        public IDataReader DistinctReader(DbTransaction trans, string TableName, string Column, string Where)
        {
            StringBuilder sql = new StringBuilder();
            sql.AppendFormat("select Distinct {0} from {1} where 1=1 {2}", Column, TableName, DataRightsWhere(TableName) + Where);

            return ExecuteReader(trans, CommandType.Text, sql.ToString());
        }

        /// ������ѯ�����е�����(ȡΨһ������)
        /// <summary>
        /// ������ѯ�����е�����(ȡΨһ������)
        /// </summary>
        /// <param name="TableName">����</param>
        /// <param name="Column">����</param>
        /// <param name="Where">����</param>
        /// <param name="Order">����</param>
        /// <returns></returns>
        public IDataReader DistinctReader(string TableName, string Column, string Where, string Order)
        {
            StringBuilder sql = new StringBuilder();
            sql.AppendFormat("select Distinct {0} from {1} where 1=1 {2} ORDER BY {3}", Column, TableName, DataRightsWhere(TableName) + Where, Order);

            return ExecuteReader(CommandType.Text, sql.ToString());
        }

        /// ������ѯ�����е�����(ȡΨһ������)
        /// <summary>
        /// ������ѯ�����е�����(ȡΨһ������)
        /// </summary>
        /// <param name="trans">����</param>
        /// <param name="TableName">����</param>
        /// <param name="Column">����</param>
        /// <param name="Where">����</param>
        /// <param name="Order">����</param>
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
