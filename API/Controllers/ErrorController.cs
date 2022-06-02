using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Errors;
using Microsoft.AspNetCore.Mvc;

//
// https://kevintsengtw.blogspot.com/2013/12/aspnet-mvc-attribute-routing.html
//

namespace API.Controllers
{ 
    [Route("errors")]
    public class ErrorController : BaseController
    {        
        [HttpGet("{code}")]
        public IActionResult Error(int code)
        {
            return new ObjectResult(new ApiResponse(code));
        }
    }
}