using MvcWebApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace MvcWebApi.Controllers
{
    public class PController : Controller
    {
        //
        // GET: /P/

        public ActionResult Index()
        {
            return View();
        }
        public UserModel getAdmin()
        {
            return new UserModel() { UserID = "000", UserName = "Admin" };
        } 
    }
}
