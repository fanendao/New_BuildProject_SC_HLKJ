using ServiceStack.Redis;
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
            //var mar = new RedisManagerPool("192.168.139.2:5000");
            //using (var client = mar.GetClient()) {
            //   // client.Set("foo","11111111111111");
            //    Console.WriteLine(client.Get<string>("name"));
            //    Console.ReadKey();
            //}

            RedisClient rc = new RedisClient("192.168.0.130", 6379);
            Console.WriteLine(rc.Get<string>("name"));
        }
    }
}
