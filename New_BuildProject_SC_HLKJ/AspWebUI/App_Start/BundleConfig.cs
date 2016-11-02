using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Optimization;

namespace AspWebUI
{
    public class BundleConfig
    {
        // 有关 Bundling 的详细信息，请访问 http://go.microsoft.com/fwlink/?LinkId=254726
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/WebFormsJs").Include(
                  "~/js/WebForms/WebForms.js",
                  "~/js/WebForms/WebUIValidation.js",
                  "~/js/WebForms/MenuStandards.js",
                  "~/js/WebForms/Focus.js",
                  "~/js/WebForms/GridView.js",
                  "~/js/WebForms/DetailsView.js",
                  "~/js/WebForms/TreeView.js",
                  "~/js/WebForms/WebParts.js"));

            bundles.Add(new ScriptBundle("~/bundles/MsAjaxJs").Include(
                "~/js/WebForms/MsAjax/MicrosoftAjax.js",
                "~/js/WebForms/MsAjax/MicrosoftAjaxApplicationServices.js",
                "~/js/WebForms/MsAjax/MicrosoftAjaxTimer.js",
                "~/js/WebForms/MsAjax/MicrosoftAjaxWebForms.js"));

            // 使用要用于开发和学习的 Modernizr 开发版本。然后，在准备好进行生产时，
            // 使用 http://modernizr.com 上的生成工具来仅选取所需的测试
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                "~/js/modernizr-*"));
        }
    }
}