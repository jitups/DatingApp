using API.Data;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BuggyController : BaseApiController
    {
        private readonly DataContext _dataContext;
        public BuggyController(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        [HttpGet("not-found")]
        public ActionResult<string> GetNotFound()
        {
            var test = _dataContext.Users.Find(-1);
            if (test == null)
            {
                return NotFound();
            }

            return Ok(test);
        }

        [HttpGet("server-error")]
        public ActionResult<string> ProduceServverError()
        {
            var test = _dataContext.Users.Find(-1);
            var testText = test.ToString();

            return Ok(test);
        }
    }
}