using Mvc.Models;
using Ninject;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ConsoleApplication1
{
    class Program
    {
        static void Main(string[] args)
        {
           IKernel ninjectKernel = new StandardKernel();

         //   ninjectKernel.Bind<IValueCalculator>().To<LinqValueCalculator>();
         ////   ninjectKernel.Bind<IDiscountHelper>().To<DefaultDiscountHelper>().WithPropertyValue("DiscountSize",10000M);
         //   ninjectKernel.Bind<IDiscountHelper>().To<DefaultDiscountHelper>().WithConstructorArgument("discountParam", 12m);
            
         //   //IValueCalculator calcImpl = ninjectKernel.Get<IValueCalculator>();
         //   //ShoppingCart cart = new ShoppingCart(calcImpl);

         //   ShoppingCart cart = ninjectKernel.Get<ShoppingCart>();

         //   Console.WriteLine("Total: {0:c}", cart.CalculateStockValue());
         //   Console.ReadKey();


            ninjectKernel.Bind<IValueCalculator>().To<LinqValueCalculator>();
            ninjectKernel.Bind<IDiscountHelper>().To<DefaultDiscountHelper>()
                .WithPropertyValue("discountParam", 5M);
            //派生类绑定
            ninjectKernel.Bind<ShoppingCart>().To<LimitShoppingCart>()
                .WithPropertyValue("ItemLimit", 3M);

          //  ShoppingCart cart = ninjectKernel.Get<ShoppingCart>();
            IValueCalculator calcImpl = ninjectKernel.Get<IValueCalculator>();
            ShoppingCart cart = new ShoppingCart(calcImpl);
            Console.WriteLine("Total: {0:c}", cart.CalculateStockValue());
            Console.ReadKey();
        }
    }
}
