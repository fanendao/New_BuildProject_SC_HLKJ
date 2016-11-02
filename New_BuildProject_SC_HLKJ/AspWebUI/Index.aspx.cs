using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace AspWebUI
{
    public partial class Index : System.Web.UI.Page
    {
        SqlDataAccess.Common.BasicDAL _bd = new SqlDataAccess.Common.BasicDAL();
        protected void Page_Load(object sender, EventArgs e)
        { 
        }
    }
}