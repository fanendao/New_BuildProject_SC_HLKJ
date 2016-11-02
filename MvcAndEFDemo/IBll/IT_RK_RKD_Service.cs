using Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IBll
{
   public interface IT_RK_RKD_Service
    {
       IEnumerable<T_RK_RKD> GetAllT_RK_RKD();
       T_RK_RKD GetT_RK_RKDById(int id);
       bool InsertT_RK_RKD(T_RK_RKD rkd);
       bool UpdateT_RK_RKD(T_RK_RKD rkd);
       bool DeleteT_RK_RKD(T_RK_RKD rkd);
    }
}
