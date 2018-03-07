using System;
using System.Collections.Generic;
using System.Text;

namespace Sportlance.DAL.Core
{
    public interface IEntityWithId
    {
        long Id { get; set; }
    }
}
