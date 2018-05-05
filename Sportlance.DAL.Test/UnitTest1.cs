using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using NUnit.Framework;
using Sportlance.DAL.Entities;
using Sportlance.DAL.Interfaces;

namespace Sportlance.DAL.Test
{
    [TestFixture]
    public class UnitTest1
    {
        private readonly TestEnviroment _env;

        private List<User> _users;
        private List<Sport> _sports;


        public UnitTest1()
        {
            _env = new TestEnviroment();
            //TestData();
            RandomData();
        }

        public void TestData()
        {
            _users = new List<User>
            {
                new User { Email = "fghfghfghfgh@asdasdsa.com", FirstName = "fdgdfgdfg", IsEmailConfirm = true, LastName = "fdgdfgdfgdfg", PasswordHash = "cxvxcvxcv"},
                new User { Email = "zxczxczxc@asdasdsa.com", FirstName = "fdgdfgdfg", IsEmailConfirm = true, LastName = "fdgdfgdfgdfg", PasswordHash = "cxvxcvxcv"},
                new User { Email = "cvbvcbvbvc@asdasdsa.com", FirstName = "fdgdfgdfg", IsEmailConfirm = true, LastName = "fdgdfgdfgdfg", PasswordHash = "cxvxcvxcv"},
                new User { Email = "fghfghfghfgh@asdasdsa.com", FirstName = "fdgdfgdfg", IsEmailConfirm = true, LastName = "fdgdfgdfgdfg", PasswordHash = "cxvxcvxcv"},
                new User { Email = "fghfghfghfgh@asdasdsa.com", FirstName = "fdgdfgdfg", IsEmailConfirm = true, LastName = "fdgdfgdfgdfg", PasswordHash = "cxvxcvxcv"},
                new User { Email = "fghfghfghfgh@asdasdsa.com", FirstName = "fdgdfgdfg", IsEmailConfirm = true, LastName = "fdgdfgdfgdfg", PasswordHash = "cxvxcvxcv"},
                new User { Email = "fghfghfghfgh@asdasdsa.com", FirstName = "fdgdfgdfg", IsEmailConfirm = true, LastName = "fdgdfgdfgdfg", PasswordHash = "cxvxcvxcv"},
            };
        }

        public void RandomData()
        {
            var dict = new Dictionary<string, List<string>>();
            dict.Add("FirstName", new List<string> { "Вася", "Петя", "Саня", "Маша", "Миша" });
            dict.Add("LastName", new List<string> { "Васин", "Петров", "Александров", "Машин", "Мишин" });
            dict.Add("Email1", new List<string> { "dfadfsafd", "dfgsdfgs", "fghdfghfgh", "xcvbxcvb", "vbnmvbnmvbn" });
            dict.Add("Email2", new List<string> { "gmail.com", "mail.ru", "yandex.ru", "rambler.ru", "yahoo.com" });

            var userCount = dict["Email1"].Count * dict["Email2"].Count;

            _users = new List<User>();
            for (var i = 0; i < userCount; i++)
            {
                var email = dict["Email1"][(int)Math.Floor(Convert.ToDecimal(i / dict["Email1"].Count))] + "@" + dict["Email2"][i % dict["Email2"].Count];
                if (_users.Any(j => j.Email == email))
                {
                    i--;
                    continue;
                }
                var user = new User
                {
                    FirstName = dict["FirstName"][new Random().Next(0, 5)],
                    LastName = dict["LastName"][new Random().Next(0, 5)],
                    Email = email,
                    IsEmailConfirm = Convert.ToBoolean(new Random().Next(0, 2)),
                    PasswordHash = "Test"
                };
                _users.Add(user);
            }

            _sports = new List<Sport>
            {
                new Sport{Name="Плавание"},
                new Sport{Name="Водное поло"},
                new Sport{Name="Бокс"}
            };
        }

        [Test]
        public async Task LoadSports()
        {
            var sportRepository = _env.GetService<ISportRepository>();
            var all = await sportRepository.GetAllAsync();
            await sportRepository.RemoveRangeAsync(all);

            await sportRepository.AddRangeAsync(_sports);
        }

        //[TearDown]
        [Test]
        public async Task ClearData()
        {
            var userRespoRepository = _env.GetService<IUserRepository>();
            var allUsers = await userRespoRepository.GetAllAsync();
            await userRespoRepository.RemoveRangeAsync(allUsers.Where(i => i.PasswordHash == "Test"));
            await LoadSports();
        }

        //[SetUp]
        [Test]
        public async Task LoadUsers()
        {
            await ClearData();
            var userRespoRepository = _env.GetService<IUserRepository>();
            await userRespoRepository.AddRangeAsync(_users);
        }

        [Test]
        public async Task LoadTrainers()
        {
            await LoadUsers();
            var trainerRepository = _env.GetService<ITrainerRepository>();
            var userRespoRepository = _env.GetService<IUserRepository>();

            var allUsers = await userRespoRepository.GetAllAsync();
            var testUsers = allUsers.Where(i => i.PasswordHash == "Test");
            var trainers = testUsers.Select(user => new Trainer
                {
                    UserId = user.Id,
                    About = "fsdfsd",
                    City = "Moscow",
                    Country = "Russia",
                    Title = "Super Trainer",
                    Price = new Random().Next(10, 40) * 100,
                    PhotoUrl = "https://odesk-prod-portraits.s3.amazonaws.com/Users:svetoslav-vladim:PortraitUrl_100?AWSAccessKeyId=AKIAIKIUKM3HBSWUGCNQ&Expires=2147483647&Signature=QEHQgSepTHZYdyB9x%2Fe9Vk4ILdo%3D"
                });

            await trainerRepository.AddRangeAsync(trainers);
        }

        [Test]
        public async Task LoadTrainerSports()
        {
            await LoadTrainers();
            var trainerRepository = _env.GetService<ITrainerRepository>();
            var sportRepository = _env.GetService<ISportRepository>();
            var allTrainers = await trainerRepository.GetAllAsync();
            var firstSport = (await sportRepository.GetAllAsync()).First();

            var trainerSports = allTrainers.Select(trainer => new TrainerSports
                {
                    SportId = firstSport.Id,
                    TrainerId = trainer.UserId
                });

            await sportRepository.AddTrainerSportsRangeAsync(trainerSports);
        }

        [Test]
        public async Task LoadTrainings()
        {
            await LoadTrainerSports();
            var trainerRepository = _env.GetService<ITrainerRepository>();
            var trainingRepository = _env.GetService<ITrainingRepository>();
            var allTrainers = await trainerRepository.GetAllAsync();

            var trainings = from trainer in allTrainers
                let rand = TimeSpan.FromDays(new Random().Next(10, 40))
                let startDate = DateTime.Today - rand
                let endDate = DateTime.Now - rand
                select new Training
                {
                    ClientId = allTrainers.ElementAt(new Random().Next(0, allTrainers.Count)).UserId,
                    //TrainerId = trainer.UserId,
                    StartDate = startDate,
                    EndDate = endDate
                };

            await trainingRepository.AddRangeAsync(trainings);
        }

        [Test]
        public async Task LoadReviews()
        {
            await LoadTrainings();
            var reviewRepository = _env.GetService<IFeedbackRepository>();
            var trainingRepository = _env.GetService<ITrainingRepository>();
            var allTrainings = await trainingRepository.GetAllAsync();

            var reviews = from training in allTrainings
                let rand = TimeSpan.FromDays(new Random().Next(10, 40))
                let createDate = DateTime.Now - rand
                let score = Convert.ToByte(new Random().Next(0, 8))
                select new Feedback
                {
                    TrainingId = training.Id,
                    CreateDate = createDate,
                    Score = score > 5 ? default(byte?) : score,
                    Description = "sdfsdfsdfasdgasdgasdgasg"
                };

            await reviewRepository.AddRangeAsync(reviews);
        }
    }
}
