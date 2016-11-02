using Model;
using System;
using System.Collections.Generic;
using System.Data.Common;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Linq.Expressions;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace Dao
{
    public class BaseDAL<T> where T : class,new()
     {
 
         /// <summary>
         /// 上下文网关
         /// </summary>
     protected Model1Container db = new Model1Container();

         #region 1.Add
 
        
         /// <summary>
         /// 增加一条数据
         /// </summary>
         /// <param name="entity"></param>
         /// <returns></returns>
         public T AddEntity(T entity)
         {   
             db.Entry<T>(entity).State = EntityState.Added;
            // db.Set<T>().Add(entity);此方法同上方法
             db.SaveChanges();
             return entity;//因为可能要返回自动增长的ID，所以把整个实体返回，否则可以直接返回bool。
         }
         /// <summary>
         /// 同时增加多条数据到一张表（事务处理）
         /// </summary>
         /// <param name="entitys"></param>
         /// <returns></returns>
         public bool AddEntity(List<T> entitys)
         {
             foreach (var entity in entitys)
             {
                 db.Entry<T>(entity).State = EntityState.Added;
             }
            // entitys.ForEach(c=>db.Entry<T>(c).State = EntityState.Added);//等价于上面的循环
             return db.SaveChanges() > 0;
         }
         #endregion
 
         #region 2.Modify
         /// <summary>
         /// 修改一条数据，会修改所有列的值，没有赋值的属性将会被赋予属性类型的默认值**************
         /// </summary>
         /// <param name="entity"></param>
         /// <returns></returns>
         public bool ModifyEntity(T entity)
         {
             db.Set<T>().Attach(entity);
             db.Entry<T>(entity).State = EntityState.Modified;//将所有属性标记为修改状态
             return db.SaveChanges() > 0;
         }
         /// <summary>
         /// 修改一条数据,会修改指定列的值
         /// </summary>
         /// <param name="entity">要修改的实体对象</param>
         /// <param name="proNames">要修改的属性名称</param>
         /// <returns></returns>
         public bool ModifyEntity(T entity,params string[]proNames)
         {
             db.Set<T>().Attach(entity);
             DbEntityEntry<T> dbee= db.Entry<T>(entity);
             dbee.State = EntityState.Unchanged;//先将所有属性状态标记为未修改
             proNames.ToList().ForEach(c => dbee.Property(c).IsModified = true);//将要修改的属性状态标记为修改
             return db.SaveChanges() > 0;
         }
         /// <summary>
         /// 根据条件批量修改指定的列********************
         /// </summary>
         /// <param name="entity"></param>
         /// <param name="whereLambds"></param>
         /// <param name="proNames"></param>
         /// <returns></returns>
         public bool ModifyEntity(T entity,Func<T,bool>whereLambds, params string[] proNames)
         {
             var entitys=db.Set<T>().Where(whereLambds).ToList();
             PropertyInfo[] proinfos = entity.GetType().GetProperties();
             List<PropertyInfo> list = new List<PropertyInfo>();
             foreach (var p in proinfos)
             {
                 if (proNames.Contains(p.Name))
                 {
                     list.Add(p);
                 }
             }
             entitys.ForEach(c => {
                 foreach (var p in list)
                 {
                    object value= p.GetValue(entity, null);
                    p.SetValue(c, value, null);
                 }
             });
             return db.SaveChanges() > 0;
         }
         #endregion
 
         #region 3.Delete
       
         /// <summary>
         /// 删除一个实体对象
         /// </summary>
         /// <param name="entity"></param>
         /// <returns></returns>
         public bool DeleteEntity(T entity)
         {
             db.Set<T>().Attach(entity);
             db.Entry<T>(entity).State = EntityState.Deleted;
             return db.SaveChanges() > 0;
         }
         /// <summary>
         /// 根据条件批量删除实体对象
         /// </summary>
         /// <param name="whereLambds"></param>
         /// <returns></returns>
         public bool DeleteEntityByWhere(Func<T, bool> whereLambds)
         {
             var data = db.Set<T>().Where<T>(whereLambds).ToList();
             return DeleteEntitys(data);     
         }
         /// <summary>
         /// 事务批量删除实体对象
         /// </summary>
         /// <param name="entitys"></param>
         /// <returns></returns>
         public bool DeleteEntitys(List<T> entitys)
         {
             foreach (var item in entitys)
             {
                 db.Set<T>().Attach(item);
                 db.Entry<T>(item).State = EntityState.Deleted;
             }
             return db.SaveChanges() > 0;
         }
       
         #endregion
 
         #region 4.Select
         //带条件查询
         public IList<T> GetEntitys(Func<T, bool> whereLambds)
         {
             return db.Set<T>().Where<T>(whereLambds).ToList<T>();
         }
         //带排序查询
         public IList<T> GetEntitys<S>(Func<T, bool> whereLambds, bool isAsc, Func<T, S> orderByLambds)
         {
             var temp = db.Set<T>().Where<T>(whereLambds);
             if (isAsc)
             {
                 return temp.OrderBy<T, S>(orderByLambds).ToList<T>();
             }
             else
             {
                 return temp.OrderByDescending<T, S>(orderByLambds).ToList<T>();
             }
         }
         //带分页查询
           public List<T> GetPagedEntitys<S>(int pageIndex, int pageSize, out int rows, out int totalPage, Expression<Func<T, bool>> whereLambds, bool isAsc, Expression<Func<T, S>> orderByLambds)
         {
             var temp = db.Set<T>().Where<T>(whereLambds);
             rows = temp.Count();
             if (rows % pageSize == 0)
             {
                 totalPage = rows / pageSize;
             }
             else
             {
                 totalPage = rows / pageSize + 1;
             }
             if (isAsc)
             {
                 temp = temp.OrderBy<T, S>(orderByLambds);
             }
             else
             {
                 temp = temp.OrderByDescending<T, S>(orderByLambds);
             }
             temp = temp.Skip<T>(pageSize * (pageIndex - 1)).Take<T>(pageSize);
 
             return temp.ToList<T>();
         }
         //传统sql结合EF分页实现查询
         public IList<T> GetPagedEntitys(int pageIndex, int pageSize, out int rows, out int totalPage, string sql, string where, bool isAsc, string orderKey)
         {
 
             sql = sql + " where 1=1 " + where;
             sql += " order by " + orderKey;
             if (!isAsc)
             {
                 sql += " desc";
             }
             var temp = db.Database.SqlQuery<T>(sql).AsEnumerable<T>();
             rows = temp.Count();
             if (rows % pageSize == 0)
             {
                 totalPage = rows / pageSize;
             }
             else
             {
                 totalPage = rows / pageSize + 1;
             }

             temp = temp.Skip<T>(pageSize * (pageIndex - 1)).Take<T>(pageSize);
             return temp.ToList<T>(); ;
 
         }
         #endregion
 
         #region 5.显式Tran
         /// <summary>
         /// 显式执行事务
         /// </summary>
         /// <param name="dics"></param>
         /// <returns></returns>
         public int ExeTran(IDictionary<string, DbParameter[]> dics)
         {
             int result = 0;
             DbConnection con = ((IObjectContextAdapter)db).ObjectContext.Connection;
             using (DbTransaction tran = con.BeginTransaction())
             {
                 try
                 {
                     //第一种，传统的执行事务的方法
                     //db.Database.ExecuteSqlCommand();
                     // db.Database.SqlQuery();                  
                     foreach (var dic in dics)
                     {
                         if (dic.Value != null)
                         {
                             result += db.Database.ExecuteSqlCommand(dic.Key, dic.Value);
                         }
                         else
                         {
                             result += db.Database.ExecuteSqlCommand(dic.Key, dic.Value);
                         }
 
                     }
                     //第二种，
                     // db.UserInfo.Add(entity);
                     //db.UserInfo.Attach(entity);
                     //db.
 
                     tran.Commit();
                     return result;
 
                 }
                 catch (Exception ex)
                 {
 
                     tran.Rollback();
                     throw ex;
                 }
                 finally
                 {
                     con.Close();
                 }
             }
         }
         #endregion
     }
}
