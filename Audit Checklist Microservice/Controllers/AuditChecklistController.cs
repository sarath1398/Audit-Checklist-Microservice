using Audit_Checklist_Microservice.Service_Layer;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Audit_Checklist_Microservice.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuditChecklistController : ControllerBase
    {

        //public string AuditType = "Internal";

        // GET: api/<AuditChecklistController>
        [HttpGet]
        public ActionResult<List<string>> Get(string auditType)
        {

            if (ModelState.IsValid)
            {
                GetQuestionsList getQuestion = new GetQuestionsList();

                List<string> QuestionList = getQuestion.Questions(auditType);

                if (QuestionList != null)
                {
                    return Ok(QuestionList);
                }
                else
                {
                    return new BadRequestObjectResult("Audit Type Mismatch!");
                }
            }

            else
            {
                return new BadRequestResult();
            }

        }

        
    }
}
