using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Mvc.Models
{
    public class DefaultDiscountHelper : IDiscountHelper 
    {
        //public decimal ApplyDiscount(decimal totalParam)
        //{
        //    return (totalParam - (1m / 10m * totalParam));
        //}

        //public decimal DiscountSize { get; set; }

        //public decimal ApplyDiscount(decimal totalParam)
        //{
        //    return (totalParam - (DiscountSize / 10m * totalParam));
        //}



        private decimal discountRate;

        public DefaultDiscountHelper(decimal discountParam)
        {
            discountRate = discountParam;
        }

        public decimal ApplyDiscount(decimal totalParam)
        {
            return (totalParam - (discountRate / 10m * totalParam));
        } 
    }
}