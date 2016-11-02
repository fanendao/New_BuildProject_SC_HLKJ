using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Mvc.Models
{
    public class LinqValueCalculator:IValueCalculator
    { 


         private IDiscountHelper discounter;

         public LinqValueCalculator(IDiscountHelper discountParam)
         {
             discounter = discountParam;
         }

         public decimal ValueProducts(params Product[] products)
         {
             return discounter.ApplyDiscount(products.Sum(p => p.Price));
         } 
    }
}