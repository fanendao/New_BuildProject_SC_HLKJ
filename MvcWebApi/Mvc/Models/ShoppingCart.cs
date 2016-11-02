using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Mvc.Models
{
    public class ShoppingCart
    {
        //private IValueCalculator calculator;

        //public ShoppingCart(IValueCalculator calcParam)
        //{
        //    calculator = calcParam;
        //}

        //public decimal CalculateStockValue()
        //{
        //    // 定义和设置产品信息
        //    Product[] products = 
        //    { 
        //                new Product() {  Name = "Kayak", Price  = 275M}, 
        //                new Product() {  Name = "Lifejacket",  Price = 48.95M},  
        //                new Product() {  Name = "Soccer ball",  Price = 19.50M}, 
        //                new Product() {  Name = "Stadium", Price  = 79500M} 
        //    };
        //    // 计算总价格  
        //    decimal totalValue = calculator.ValueProducts(products);

        //    // 返回计算结果  
        //    return totalValue;
        //}

        protected IValueCalculator calculator;
        protected Product[] products;

        //构造函数，参数为实现了IEmailSender接口的类的实例
        public ShoppingCart(IValueCalculator calcParam)
        {
            calculator = calcParam;
            products = new[]{ 
            new Product {Name = "西瓜", Category = "水果", Price = 2.3M}, 
            new Product {Name = "苹果", Category = "水果", Price = 4.9M}, 
            new Product {Name = "空心菜", Category = "蔬菜", Price = 2.2M}, 
            new Product {Name = "地瓜", Category = "蔬菜", Price = 1.9M} 
        };
        }

        //计算购物车内商品总价钱
        public virtual decimal CalculateStockValue()
        {
            //计算商品总价钱 
            decimal totalValue = calculator.ValueProducts(products);
            return totalValue;
        }
    }
}