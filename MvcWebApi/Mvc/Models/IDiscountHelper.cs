using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Mvc.Models
{
    //折扣计算接口
    public interface IDiscountHelper
    {
        decimal ApplyDiscount(decimal totalParam);
    }
}