using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace AspWebUI
{
    public partial class Index : System.Web.UI.Page
    {
        SqlDataAccess.Common.BasicDAL _bd = new SqlDataAccess.Common.BasicDAL();
        DataTable dt_Function = new DataTable();
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                CreateLeftMenuHtml(); 
            }
        }

        /// <summary>
        /// 创建左侧的点击菜单
        /// </summary>
        private void CreateLeftMenuHtml()
        {
           DataTable dt_left_Menu = _bd.GetProc("select * from ts_function").Tables[0];
           StringBuilder menustring = new StringBuilder();
            if (dt_left_Menu!=null && dt_left_Menu.Rows.Count>0)
            {
                dt_Function = dt_left_Menu.Clone();
                DiGuiDataTable(dt_left_Menu, "-1");
                if (dt_Function != null && dt_Function.Rows.Count > 0)
                {
                    string typeName = "";
                    bool addNewUL = true;
                    string function_depth = "", function_ioc = "", function_Name = "", function_isClick = "", function_Url = "", function_Id="",function_IsTip="",function_del1="";
                    typeName = dt_Function.Rows[0]["function_Name"].ToString();
                    for (int i = 0; i < dt_Function.Rows.Count; i++)
                    { 
                         
                            function_Name = dt_Function.Rows[i]["function_Name"].ToString();
                            function_depth = dt_Function.Rows[i]["function_depth"].ToString();
                            function_ioc = dt_Function.Rows[i]["function_ioc"].ToString();
                            function_isClick = dt_Function.Rows[i]["function_isClick"].ToString();
                            function_Url = dt_Function.Rows[i]["function_Url"].ToString();
                            function_Id = dt_Function.Rows[i]["function_Id"].ToString();
                            function_del1 = dt_Function.Rows[i]["function_del"].ToString();  
                            function_IsTip = dt_Function.Rows[i]["function_IsTip"].ToString();
                            menustring.Append("<li>");

                            if (function_depth=="1"&&function_del1=="0")
                            {
                                //判断是否可点击
                                if (function_isClick=="1")//可点击
                                {
                                    menustring.AppendFormat(" <a class=\"J_menuItem\" href=\"{0}\"><i class=\"{1}\"></i> <span class=\"nav-label\">{2}</span></a>", function_Url,function_ioc, function_Name);
                                }
                                else
                                {
                                    menustring.AppendFormat("<a href=\"#\"><i class=\"{0}\"></i><span class=\"nav-label\">{1}</span><span class=\"fa arrow\"></span></a>", function_ioc, function_Name);
                                } 
                                //判断是否需要提示
                                if (function_IsTip=="1")
	                            {
		                              menustring.Append("<span class=\"label label-warning pull-right\">16</span>");
	                            }
                                 
                                //判断是否有子集
                                DataRow[] dr_ej = dt_Function.Select(" function_del=0 and function_ParentID=" + function_Id, " function_order asc ");
                                if (dr_ej.Length>0)
                                {
                                    #region 循环二级
                                    menustring.Append("<ul class=\"nav nav-second-level\">");
                                    string EJ_CLICK = "";
                                    for (int er = 0; er < dr_ej.Length; er++)
                                    {
                                        EJ_CLICK = dr_ej[er]["function_isClick"].ToString();
                                        string EJ_function_Id = dr_ej[er]["function_Id"].ToString();
                                        menustring.Append("<li>");
                                        if (EJ_CLICK == "1")
                                        {

                                            menustring.AppendFormat(" <a class=\"J_menuItem\" href=\"{0}\">{1}</a> ", dr_ej[er]["function_Url"].ToString(), dr_ej[er]["function_Name"].ToString());
                                        }
                                        else
                                        {
                                            menustring.AppendFormat(" <a href=\"#\">{0}<span class=\"fa arrow\"></span></a>", dr_ej[er]["function_Name"].ToString());
                                        }
                                        //判断是否有三级
                                        DataRow[] dr_sj = dt_Function.Select(" function_del=0 and function_ParentID=" + EJ_function_Id, " function_order asc ");
                                        if (dr_sj.Length > 0)
                                        {
                                            string SJ_CLICK = "";
                                            menustring.Append("<ul class=\"nav nav-third-level\">");


                                            #region 循环三级
                                            for (int sj = 0; sj < dr_sj.Length; sj++)
                                            {
                                                SJ_CLICK = dr_sj[sj]["function_isClick"].ToString();
                                                string SJ_function_Id = dr_sj[sj]["function_Id"].ToString();
                                                menustring.Append("<li>");
                                                if (SJ_CLICK == "1")
                                                {

                                                    menustring.AppendFormat(" <a class=\"J_menuItem\" href=\"{0}\">{1}</a> ", dr_sj[sj]["function_Url"].ToString(), dr_sj[sj]["function_Name"].ToString());
                                                }
                                                else
                                                {
                                                    menustring.AppendFormat(" <a href=\"#\">{0}<span class=\"fa arrow\"></span></a>", dr_sj[sj]["function_Name"].ToString());
                                                }
                                                menustring.Append("</li>");
                                            }
                                            #endregion

                                            menustring.Append("</ul>");
                                        }

                                        menustring.Append("</li>");
                                    }
                                    menustring.Append("</ul>");
                                    #endregion
                                } 
                            }
                            else if (function_depth == "2")
                            {

                            }
                            else if (function_depth == "3")
                            {

                            } 
                        

                    }
                    lit_leftMenu_HTML.Text = menustring.ToString();
                }
            }



        }
        protected void DiGuiDataTable(DataTable FromDataTable, object pid)
        {
            if (FromDataTable.Select("function_ParentID=" + pid ).Length > 0)
            {
                DataRow[] dr = FromDataTable.Select("function_del=0 and function_ParentID=" + pid, " function_order asc ");
               foreach (DataRow item in dr)
                {
                    dt_Function.Rows.Add(item.ItemArray);
                    DiGuiDataTable(FromDataTable, item["function_Id"]);
                }
            }
        }
      

    }
}