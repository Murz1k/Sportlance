using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Sportlance.WebAPI.Requests;
using Sportlance.WebAPI.Responses;

namespace Sportlance.WebAPI.Controllers
{
    [Route("api/feedbacks")]
    public class FeedbacksController : Controller
    {
        [HttpGet]
        [Authorize]
        public void Get()
        {
            // Получить все отзывы может только администратор в админке
        }

        [HttpGet("{trainerId}")]
        public void Get(int trainerId)
        {
            // Получить все отзывы по тренеру
        }

        [HttpPost]
        [Authorize]
        public async Task<EmptyResponse> Post(FeedbackRequest request)
        {
            //Проверить может ли клиент оставить отзыв тренеру

            //если может - оставляет

            return new EmptyResponse();
        }

        [HttpPut("{id}")]
        [Authorize]
        public void Put(int id, [FromBody] string value)
        {
            //Обновить отзыв может только администратор
        }

        [HttpDelete("{id}")]
        [Authorize]
        public void Delete(int id)
        {
            //Удалить отзыв может только администратор (пометить как удаленный)
        }
    }
}