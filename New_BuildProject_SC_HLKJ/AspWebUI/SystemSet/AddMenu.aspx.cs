using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace AspWebUI.SystemSet
{
    public partial class AddMenu : System.Web.UI.Page
    {
        SqlDataAccess.Common.BasicDAL _bd = new SqlDataAccess.Common.BasicDAL();
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        protected void ddl_CDJS_SelectedIndexChanged(object sender, EventArgs e)
        {
            string cdjsval = ddl_CDJS.SelectedValue;
            DataTable dt = null;
            if (cdjsval=="1")
            {
                ddl_SJCD.Items.Clear();
                ddl_SJCD.Items.Insert(0,new ListItem("根节点","-1"));
            }
            else if (cdjsval=="2")//查询一级
            {
              dt =  GetFuncDataByDepth(2);
            }
            else if (cdjsval=="3")
            {
                dt = GetFuncDataByDepth(3);
            }
            if (dt!=null)
            {
                ddl_SJCD.DataSource = dt;
                ddl_SJCD.DataTextField = "function_Name";
                ddl_SJCD.DataValueField = "function_Id";
                ddl_SJCD.DataBind();
            }
        }

        
        private DataTable GetFuncDataByDepth(int depth)
        {
            return _bd.GetProc("select function_Id,function_Name from ts_function where function_depth=" + depth + " order by function_order asc ").Tables[0];
            
        }

        /// <summary>
        /// 保存界面信息
        /// </summary>
        /// <param name="sender"></param>
        /// <param name="e"></param>
        protected void btn_Commit_ServerClick(object sender, EventArgs e)
        {
            string cc = sel_sf.Value;
        }
    }
}