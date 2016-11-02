using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Mvc.Models
{
    //价格计算接口
    public interface IValueCalculator
    {
        decimal ValueProducts(params Product[] products);
    }
}