using Dao;
using IBll;
using IDao;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bll
{
    public class T_RK_RKD_Service : IT_RK_RKD_Service
    {
        public T_RK_RKD_Service()
        {
            iRkdDao = new RkdDao();
        }
        private IRkdDao iRkdDao;

        public IRkdDao IRkdDao
        {
            get { return iRkdDao; }
            set { iRkdDao = value; }
        } 
         
        /// <summary>
        /// 查询入库单信息
        /// </summary>
        /// <returns></returns>
        public IEnumerable<Model.T_RK_RKD> GetAllT_RK_RKD()
        {
            return IRkdDao.GetEntities();
        }

        /// <summary>
        /// 根据ID查询入库单信息
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public Model.T_RK_RKD GetT_RK_RKDById(int id)
        {
            return IRkdDao.GetEntityById(id);
        }

        /// <summary>
        /// 插入入库单信息
        /// </summary>
        /// <param name="rkd"></param>
        /// <returns></returns>
        public bool InsertT_RK_RKD(Model.T_RK_RKD rkd)
        {
            return IRkdDao.Insert(rkd);
        }

        /// <summary>
        /// 更新入库单
        /// </summary>
        /// <param name="rkd"></param>
        /// <returns></returns>
        public bool UpdateT_RK_RKD(Model.T_RK_RKD rkd)
        {
            return IRkdDao.Update(rkd);
        }

        /// <summary>
        /// 删除入库单
        /// </summary>
        /// <param name="rkd"></param>
        /// <returns></returns>
        public bool DeleteT_RK_RKD(Model.T_RK_RKD rkd)
        {
            return IRkdDao.Delete(rkd);
        }
    }
}
