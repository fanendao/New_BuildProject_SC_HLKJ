using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IDao
{
   public interface IBaseDao<T> where T:class
    {
       IEnumerable<T> GetEntities();
       T GetEntityById(object id);
       bool Insert(T entity);
       bool Update(T entity);
       bool Delete(T entity);
       bool DeleteById(object Id);
    }
}
