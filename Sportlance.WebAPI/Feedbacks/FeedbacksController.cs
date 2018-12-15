using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Sportlance.WebAPI.Core;
using Sportlance.WebAPI.Core.Extensions;
using Sportlance.WebAPI.Entities;
using Sportlance.WebAPI.Feedbacks.Requests;

namespace Sportlance.WebAPI.Feedbacks
{
    public class FeedbacksController : Controller
    {
        private readonly IFeedbackService _service;

        public FeedbacksController(IFeedbackService service)
        {
            _service = service;
        }

        [HttpGet]
        [Authorize]
        public void Get()
        {
            // Получить все отзывы может только администратор в админке
        }

        [HttpGet]
        [Route("trainers/{trainerId}/feedbacks")]
        public async Task<PartialCollectionResponse<ReviewInfo>> GetTrainerFeedbacks(int trainerId, [FromQuery] GetFeedbacksQueryRequest request)
        {
            var feedbacks = await _service.GetTrainerFeedbacksAsync(trainerId, request.Offset, request.Count);

            return feedbacks.ToPartialCollectionResponse();
        }

        [HttpGet]
        [Authorize]
        [Route("trainers/self/feedbacks")]
        public async Task<PartialCollectionResponse<ReviewInfo>> GetTrainerFeedbacks([FromQuery] GetFeedbacksQueryRequest request)
        {
            var feedbacks = await _service.GetTrainerFeedbacksAsync(User.GetUserId(), request.Offset, request.Count);

            return feedbacks.ToPartialCollectionResponse();
        }

        [HttpPost]
        [Authorize]
        public Task<IActionResult> Post(FeedbackRequest request)
        {
            //Проверить может ли клиент оставить отзыв тренеру

            //если может - оставляет

            return null;
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