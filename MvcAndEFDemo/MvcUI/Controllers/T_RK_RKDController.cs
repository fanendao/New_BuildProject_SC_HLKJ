using Bll;
using IBll;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace MvcUI.Controllers
{
    public class T_RK_RKDController : Controller
    {
        //
        // GET: /T_RK_RKD/

        public ActionResult Index()
        {
            IT_RK_RKD_Service RkService = new T_RK_RKD_Service();
            ViewData.Model = RkService.GetAllT_RK_RKD();
            return View();
        }

        //
        // GET: /T_RK_RKD/Details/5

        public ActionResult Details(int id)
        {
            return View();
        }

        //
        // GET: /T_RK_RKD/Create

        public ActionResult Create()
        {
            return View();
        }

        //
        // POST: /T_RK_RKD/Create

        [HttpPost]
        public ActionResult Create(FormCollection collection)
        {
            try
            {
                // TODO: Add insert logic here

                return RedirectToAction("Index");
            }
            catch
            {
                return View();
            }
        }

        //
        // GET: /T_RK_RKD/Edit/5

        public ActionResult Edit(int id)
        {
            return View();
        }

        //
        // POST: /T_RK_RKD/Edit/5

        [HttpPost]
        public ActionResult Edit(int id, FormCollection collection)
        {
            try
            {
                // TODO: Add update logic here

                return RedirectToAction("Index");
            }
            catch
            {
                return View();
            }
        }

        //
        // GET: /T_RK_RKD/Delete/5

        public ActionResult Delete(int id)
        {
            return View();
        }

        //
        // POST: /T_RK_RKD/Delete/5

        [HttpPost]
        public ActionResult Delete(int id, FormCollection collection)
        {
            try
            {
                // TODO: Add delete logic here

                return RedirectToAction("Index");
            }
            catch
            {
                return View();
            }
        }
    }
}
