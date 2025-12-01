using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BuggyController : ControllerBase
    {

        [HttpGet("not-found")]
        public ActionResult GetNotFound()
        {
            return NotFound("This is a not found response from the BuggyController.");
        }

        [HttpGet("server-error")]
        public ActionResult GetServerError()
        {
            throw new System.Exception("This is a server error from the BuggyController.");
        }

        [HttpGet("bad-request")]
        public ActionResult GetBadRequest()
        {
            return BadRequest(new ProblemDetails { Title = "This is a bad request" });
        }

        [HttpGet("unauthorized")]
        public ActionResult GetUnauthorized()
        {
            return Unauthorized("You are not autjorized");
        }
        [HttpGet("validation-error")]
        public ActionResult GetValidationError()
        {
            {
                ModelState.AddModelError("porblem1", "Error message1");
                ModelState.AddModelError("porblem2", "Error message2");
                return ValidationProblem();
            }
        }
    }
}
