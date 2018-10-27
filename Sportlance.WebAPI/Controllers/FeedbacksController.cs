using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Sportlance.WebAPI.Extensions;
using Sportlance.WebAPI.Requests;
using Sportlance.WebAPI.Responses;
using Sportlance.WebAPI.Interfaces;
using Sportlance.WebAPI.Entities;

namespace Sportlance.WebAPI.Controllers
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