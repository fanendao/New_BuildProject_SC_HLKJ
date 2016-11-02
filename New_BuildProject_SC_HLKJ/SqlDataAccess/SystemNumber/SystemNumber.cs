using System;
using System.Collections.Generic;
using System.Text;
using System.Data;
using System.Data.Common;
using System.Data.SqlClient;
using IT.Logistics.CommonComponent.Data;

namespace SqlDataAccess.SystemNumber
{
    public class SystemNumber : DataAccessBase
    {
        // 生成编号(非事务,会修改编号表内容)
        /// <summary>
        /// 生成编号(非事务,会修改编号表内容)
        /// </summary>
        /// <param name="str_BillType">类型(如'货运单号')</param>
        /// <param name="str_BillLogo">前缀标识(如'HY')</param>
        /// <param name="str_BillLength">长度(如后跟3位'001')</param>
        /// <param name="str_TableName">表名(去表前缀如'货运单表')</param>
        /// <param name="str_TableField">表中编号字段(如'货运单号')</param>
        /// <param name="str_Rooid">组织机构ID</param>
        /// <returns>返回编号值</returns>
        public string BASE_Get_NumberADD(string str_BillType, string str_BillLogo, string str_BillLength, string str_TableName,
                                         string str_TableField, string str_Rooid)
        {
            string _Number = ""; //定义编号变量
            if (string.IsNullOrEmpty(str_BillType)) //类型不能为空
            {
                return "";
            }
            else
            {
                // 执行存储过程(GetNumber)
                string _SQL = "EXEC GetNumberADD '" + str_BillType + "','" + str_BillLogo + "','" + str_BillLength + "','" +
                                                   str_TableName + "','" + str_TableField + "','" + str_Rooid + "'";

                System.Data.IDataReader _mDataReader = this.ExecuteReader(CommandType.Text, _SQL);
                while (_mDataReader.Read())
                {
                    _Number = _mDataReader[0].ToString();//获取存储过程返回值
                }
                _mDataReader.Close();

                return _Number; //返回编号
            }
        }

        // 生成编号(非事务,不修改编号表内容)
        /// <summary>
        /// 生成编号(非事务,不修改编号表内容)
        /// </summary>
        /// <param name="str_BillType">类型(如'货运单号')</param>
        /// <param name="str_BillLogo">前缀标识(如'HY')</param>
        /// <param name="str_BillLength">长度(如后跟3位'001')</param>
        /// <param name="str_TableName">表名(去表前缀如'货运单表')</param>
        /// <param name="str_TableField">表中编号字段(如'货运单号')</param>
        /// <param name="str_Rooid">组织机构ID</param>
        /// <returns>返回编号值</returns>
        public string BASE_Get_Number(string str_BillType, string str_BillLogo, string str_BillLength, string str_TableName,
                                      string str_TableField, string str_Rooid)
        {
            string _Number = ""; //定义编号变量

            if (string.IsNullOrEmpty(str_BillType))//类型不能为空
            {
                return "";
            }
            else
            {
                // 执行存储过程(GetNumberADD)
                string _SQL = "EXEC GetNumber '" + str_BillType + "','" + str_BillLogo + "','" + str_BillLength + "','" +
                                                      str_TableName + "','" + str_TableField + "','" + str_Rooid + "'";
                System.Data.IDataReader _mDataReader = this.ExecuteReader(CommandType.Text, _SQL);
                while (_mDataReader.Read())
                {
                    _Number = _mDataReader[0].ToString();//获取存储过程返回值
                }
                _mDataReader.Close();

                return _Number;//返回编号
            }
        }

        // 生成编号(有事务,会修改编号表内容)
        /// <summary>
        /// 生成编号(有事务,会修改编号表内容)
        /// </summary>
        /// <param name="trans">事务</param>
        /// <param name="str_BillType">类型(如'货运单号')</param>
        /// <param name="str_BillLogo">前缀标识(如'HY')</param>
        /// <param name="str_BillLength">长度(如后跟3位'001')</param>
        /// <param name="str_TableName">表名(去表前缀如'货运单表')</param>
        /// <param name="str_TableField">表中编号字段(如'货运单号')</param>
        /// <param name="str_Rooid">组织机构ID</param>
        /// <returns>返回编号值</returns>
        public string BASE_Get_NumberADD(DbTransaction trans, string str_BillType, string str_BillLogo, string str_BillLength,
                                         string str_TableName, string str_TableField, string str_Rooid)
        {
            string _Number = "";//定义编号变量
            if (string.IsNullOrEmpty(str_BillType))//类型不能为空
            {
                return "";
            }
            else
            {
                // 执行存储过程(GetNumber)
                string _SQL = "EXEC GetNumberADD '" + str_BillType + "','" + str_BillLogo + "','" + str_BillLength + "','" +
                                                  str_TableName + "','" + str_TableField + "','" + str_Rooid + "'";
                System.Data.IDataReader _mDataReader = this.ExecuteReader(trans, CommandType.Text, _SQL);
                while (_mDataReader.Read())
                {
                    _Number = _mDataReader[0].ToString();//获取存储过程返回值
                }
                _mDataReader.Close();

                return _Number;//返回编号
            }
        }

        // 获取表中最后编号
        /// <summary>
        /// 获取表中最后编号
        /// </summary>
        /// <param name="str_TableName">表名(去表前缀如'货运单表')</param>
        /// <param name="str_TableField">表中编号字段(如'货运单号')</param>
        /// <param name="str_Where">条件</param>
        /// <returns>返回编号值</returns>
        public string BASE_Get_Number(string str_TableName, string str_TableField, string str_Where)
        {
            try
            {
                string _Number = "";//定义编号变量
                string _SQL = "select top 1 " + str_TableField + " from " + str_TableName + " where 1=1 " +
                              str_Where + "  order by id desc ";
                System.Data.IDataReader _mDataReader = this.ExecuteReader(CommandType.Text, _SQL);
                while (_mDataReader.Read())
                {
                    _Number = _mDataReader[0].ToString();
                }
                _mDataReader.Close();
                return _Number; //返回编号
            }
            catch
            {
                return "0";
            }
        }
    }
}
