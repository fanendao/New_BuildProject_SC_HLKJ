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
        // ���ɱ��(������,���޸ı�ű�����)
        /// <summary>
        /// ���ɱ��(������,���޸ı�ű�����)
        /// </summary>
        /// <param name="str_BillType">����(��'���˵���')</param>
        /// <param name="str_BillLogo">ǰ׺��ʶ(��'HY')</param>
        /// <param name="str_BillLength">����(����3λ'001')</param>
        /// <param name="str_TableName">����(ȥ��ǰ׺��'���˵���')</param>
        /// <param name="str_TableField">���б���ֶ�(��'���˵���')</param>
        /// <param name="str_Rooid">��֯����ID</param>
        /// <returns>���ر��ֵ</returns>
        public string BASE_Get_NumberADD(string str_BillType, string str_BillLogo, string str_BillLength, string str_TableName,
                                         string str_TableField, string str_Rooid)
        {
            string _Number = ""; //�����ű���
            if (string.IsNullOrEmpty(str_BillType)) //���Ͳ���Ϊ��
            {
                return "";
            }
            else
            {
                // ִ�д洢����(GetNumber)
                string _SQL = "EXEC GetNumberADD '" + str_BillType + "','" + str_BillLogo + "','" + str_BillLength + "','" +
                                                   str_TableName + "','" + str_TableField + "','" + str_Rooid + "'";

                System.Data.IDataReader _mDataReader = this.ExecuteReader(CommandType.Text, _SQL);
                while (_mDataReader.Read())
                {
                    _Number = _mDataReader[0].ToString();//��ȡ�洢���̷���ֵ
                }
                _mDataReader.Close();

                return _Number; //���ر��
            }
        }

        // ���ɱ��(������,���޸ı�ű�����)
        /// <summary>
        /// ���ɱ��(������,���޸ı�ű�����)
        /// </summary>
        /// <param name="str_BillType">����(��'���˵���')</param>
        /// <param name="str_BillLogo">ǰ׺��ʶ(��'HY')</param>
        /// <param name="str_BillLength">����(����3λ'001')</param>
        /// <param name="str_TableName">����(ȥ��ǰ׺��'���˵���')</param>
        /// <param name="str_TableField">���б���ֶ�(��'���˵���')</param>
        /// <param name="str_Rooid">��֯����ID</param>
        /// <returns>���ر��ֵ</returns>
        public string BASE_Get_Number(string str_BillType, string str_BillLogo, string str_BillLength, string str_TableName,
                                      string str_TableField, string str_Rooid)
        {
            string _Number = ""; //�����ű���

            if (string.IsNullOrEmpty(str_BillType))//���Ͳ���Ϊ��
            {
                return "";
            }
            else
            {
                // ִ�д洢����(GetNumberADD)
                string _SQL = "EXEC GetNumber '" + str_BillType + "','" + str_BillLogo + "','" + str_BillLength + "','" +
                                                      str_TableName + "','" + str_TableField + "','" + str_Rooid + "'";
                System.Data.IDataReader _mDataReader = this.ExecuteReader(CommandType.Text, _SQL);
                while (_mDataReader.Read())
                {
                    _Number = _mDataReader[0].ToString();//��ȡ�洢���̷���ֵ
                }
                _mDataReader.Close();

                return _Number;//���ر��
            }
        }

        // ���ɱ��(������,���޸ı�ű�����)
        /// <summary>
        /// ���ɱ��(������,���޸ı�ű�����)
        /// </summary>
        /// <param name="trans">����</param>
        /// <param name="str_BillType">����(��'���˵���')</param>
        /// <param name="str_BillLogo">ǰ׺��ʶ(��'HY')</param>
        /// <param name="str_BillLength">����(����3λ'001')</param>
        /// <param name="str_TableName">����(ȥ��ǰ׺��'���˵���')</param>
        /// <param name="str_TableField">���б���ֶ�(��'���˵���')</param>
        /// <param name="str_Rooid">��֯����ID</param>
        /// <returns>���ر��ֵ</returns>
        public string BASE_Get_NumberADD(DbTransaction trans, string str_BillType, string str_BillLogo, string str_BillLength,
                                         string str_TableName, string str_TableField, string str_Rooid)
        {
            string _Number = "";//�����ű���
            if (string.IsNullOrEmpty(str_BillType))//���Ͳ���Ϊ��
            {
                return "";
            }
            else
            {
                // ִ�д洢����(GetNumber)
                string _SQL = "EXEC GetNumberADD '" + str_BillType + "','" + str_BillLogo + "','" + str_BillLength + "','" +
                                                  str_TableName + "','" + str_TableField + "','" + str_Rooid + "'";
                System.Data.IDataReader _mDataReader = this.ExecuteReader(trans, CommandType.Text, _SQL);
                while (_mDataReader.Read())
                {
                    _Number = _mDataReader[0].ToString();//��ȡ�洢���̷���ֵ
                }
                _mDataReader.Close();

                return _Number;//���ر��
            }
        }

        // ��ȡ���������
        /// <summary>
        /// ��ȡ���������
        /// </summary>
        /// <param name="str_TableName">����(ȥ��ǰ׺��'���˵���')</param>
        /// <param name="str_TableField">���б���ֶ�(��'���˵���')</param>
        /// <param name="str_Where">����</param>
        /// <returns>���ر��ֵ</returns>
        public string BASE_Get_Number(string str_TableName, string str_TableField, string str_Where)
        {
            try
            {
                string _Number = "";//�����ű���
                string _SQL = "select top 1 " + str_TableField + " from " + str_TableName + " where 1=1 " +
                              str_Where + "  order by id desc ";
                System.Data.IDataReader _mDataReader = this.ExecuteReader(CommandType.Text, _SQL);
                while (_mDataReader.Read())
                {
                    _Number = _mDataReader[0].ToString();
                }
                _mDataReader.Close();
                return _Number; //���ر��
            }
            catch
            {
                return "0";
            }
        }
    }
}
