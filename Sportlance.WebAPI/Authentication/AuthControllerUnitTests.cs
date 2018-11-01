using System.Threading.Tasks;
using Microsoft.AspNetCore.DataProtection;
using NUnit.Framework;
using Sportlance.WebAPI.Core;
using Sportlance.WebAPI.Requests;
using Sportlance.WebAPI.Users;

namespace Sportlance.WebAPI.Authentication
{
    [TestFixture]
    public class AuthControllerUnitTests
    {
        private readonly TestEnviroment _env;

        public AuthControllerUnitTests()
        {
            _env = new TestEnviroment();
        }

//        Зашел на сайт
//            Зарегистрировался
//        На почту отправилось письмо
//        Перешел по ссылке в почте
//            Аккаунт подтвержден
//            Вход
//        Получение токена.
        [Test]
        public async Task RegistrationAsync()
        {
            var userService = new MockUserService();
            var mailService = new MockMailService();
            var mailTokenService = new MailTokenService(new EphemeralDataProtectionProvider());
            var authService = new MockAuthService();
            var controller = new AuthController(userService, mailService, mailTokenService, authService);

            var request = new RegistrationRequest
            {
                FirstName = "UserName1",
                LastName = "UserName2",
                Email = "UserEmail",
                Password = "UserPassword1"
            };

            var response = await controller.RegistrationAsync(request);
            
            Assert.AreEqual(request.Email, response.Email);
            Assert.AreEqual(request.LastName, response.LastName);
            Assert.AreEqual(request.Email, response.Email);
        }
//
//            Вход если аккаунт не подтвержден
//        ok 200 error: Аккаунт не подтвержден
//            Переход на страницу "Аккаунт не подтвержден", где можно повторно отправить письмо
//            или перейти на страницу логина (поменять аккаунт)
//
//        Регистрация если такой аккаунт есть
//            ok 200 error: Такой аккаунт уже существует. Войти?

//        [Test]
//        public async Task ClearData()
//        {
//            var testUsers = await _env.GetContext().Users.Where(i => i.PasswordHash == "Test").ToArrayAsync();
//            _env.GetContext().RemoveRange(testUsers);
//            await _env.GetContext().SaveChangesAsync();
//            await LoadSports();
//        }
    }
}