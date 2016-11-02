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
    public class UploadImage : DataAccessBase
    {
        
        public int InsertImage(string Guid, Byte[] byt)
        {
            StringBuilder sql = new StringBuilder();

            sql.AppendFormat("INSERT INTO BsitscfyccglNETimage.dbo.CCHTFJB (GUID, Content) VALUES (");
            sql.AppendFormat("'{0}',@Code);SELECT @@IDENTITY", Guid);

            DbCommand cmd = this.GetSqlStringCommand(sql.ToString());

            this.AddInParameter(cmd, "Code", DbType.Binary, byt);

            object row = this.ExecuteScalar(cmd);
            if (row != null && row != DBNull.Value)
            {
                return Convert.ToInt32(row);
            }
            else
            {
                throw new InvalidOperationException("Êý¾Ý¿â²Ù×÷Ê§°Ü£¡");
            }
        }

        public void UpdateImage(string Guid, Byte[] byt)
        {
            StringBuilder sql = new StringBuilder();

            sql.AppendFormat("update BsitscfyccglNETimage.dbo.CCHTFJB set Content = @Code where GUID = '{0}'", Guid);

            DbCommand cmd = this.GetSqlStringCommand(sql.ToString());

            this.AddInParameter(cmd, "Code", DbType.Binary, byt);

            this.ExecuteNonQuery(cmd);
            
        }
    }
}
