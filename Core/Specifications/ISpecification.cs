using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace Core.Specifications
{
    public interface ISpecification<T>
    {
        Expression<Func<T, bool>>? Criteria {get;}
        List<Expression<Func<T, object>>> Includes {get;}

        // Sort
        Expression<Func<T, Object>>? OrderBy {get;}
        Expression<Func<T, Object>>? OrderByDescending {get;}

        // Pagination
        int Take {get;}
        int Skip {get;}
        bool IsPagingEnabled {get;}
    }
}

//
// 瞭解解決可為 Null 警告的技術
// https://docs.microsoft.com/zh-tw/dotnet/csharp/nullable-warnings
//