using IDao;
using Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dao
{
    public class RkdDao : BaseDAL<T_RK_RKD>, IRkdDao
    {

        /// <summary>
        /// 获取所有大于2015-07-21的
        /// </summary>
        /// <returns></returns>
        public IEnumerable<T_RK_RKD> GetEntities()
        {
            DateTime de = Convert.ToDateTime("2015-07-21");
           return  GetEntitys(c => c.DJRQ > de);
        }

        /// <summary>
        /// 根据ID查询实体数据
        /// </summary>
        /// <param name="id">主键ID</param>
        /// <returns></returns>
        public T_RK_RKD GetEntityById(object id)
        {
            string ID = Convert.ToString(id);
            return GetEntitys(c => c.ID == ID).SingleOrDefault<T_RK_RKD>();
        }

        /// <summary>
        /// 插入一条数据
        /// </summary>
        /// <param name="entity"></param>
        /// <returns></returns>
        public bool Insert(T_RK_RKD entity)
        {
            bool flag = false;
            T_RK_RKD rk = AddEntity(entity);
            if (rk !=null)
            {
                flag = true;
            }
            return flag;
        }

        /// <summary>
        /// 更新实体
        /// </summary>
        /// <param name="entity"></param>
        /// <returns></returns>
        public bool Update(T_RK_RKD entity)
        {
        return    ModifyEntity(entity);
        }

        /// <summary>
        /// 删除实体
        /// </summary>
        /// <param name="entity">实体</param>
        /// <returns></returns>
        public bool Delete(T_RK_RKD entity)
        {
          return  DeleteEntity(entity);
        }

        /// <summary>
        /// 根据ID删除实体
        /// </summary>
        /// <param name="Id"></param>
        /// <returns></returns>
        public bool DeleteById(object Id)
        { 
            string I_D = Convert.ToString(Id);
            T_RK_RKD t = new T_RK_RKD(){ID=I_D};
           return Delete(t);
        }
    }
}
