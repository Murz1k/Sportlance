using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using NUnit.Framework;
using Sportlance.DAL.Entities;

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
                new User
                {
                    Email = "fghfghfghfgh@asdasdsa.com",
                    FirstName = "fdgdfgdfg",
                    IsEmailConfirm = true,
                    LastName = "fdgdfgdfgdfg",
                    PasswordHash = "cxvxcvxcv"
                },
                new User
                {
                    Email = "zxczxczxc@asdasdsa.com",
                    FirstName = "fdgdfgdfg",
                    IsEmailConfirm = true,
                    LastName = "fdgdfgdfgdfg",
                    PasswordHash = "cxvxcvxcv"
                },
                new User
                {
                    Email = "cvbvcbvbvc@asdasdsa.com",
                    FirstName = "fdgdfgdfg",
                    IsEmailConfirm = true,
                    LastName = "fdgdfgdfgdfg",
                    PasswordHash = "cxvxcvxcv"
                },
                new User
                {
                    Email = "fghfghfghfgh@asdasdsa.com",
                    FirstName = "fdgdfgdfg",
                    IsEmailConfirm = true,
                    LastName = "fdgdfgdfgdfg",
                    PasswordHash = "cxvxcvxcv"
                },
                new User
                {
                    Email = "fghfghfghfgh@asdasdsa.com",
                    FirstName = "fdgdfgdfg",
                    IsEmailConfirm = true,
                    LastName = "fdgdfgdfgdfg",
                    PasswordHash = "cxvxcvxcv"
                },
                new User
                {
                    Email = "fghfghfghfgh@asdasdsa.com",
                    FirstName = "fdgdfgdfg",
                    IsEmailConfirm = true,
                    LastName = "fdgdfgdfgdfg",
                    PasswordHash = "cxvxcvxcv"
                },
                new User
                {
                    Email = "fghfghfghfgh@asdasdsa.com",
                    FirstName = "fdgdfgdfg",
                    IsEmailConfirm = true,
                    LastName = "fdgdfgdfgdfg",
                    PasswordHash = "cxvxcvxcv"
                }
            };
        }

        public void RandomData()
        {
            var dict = new Dictionary<string, List<string>>();
            dict.Add("FirstName", new List<string> {"Вася", "Петя", "Саня", "Маша", "Миша"});
            dict.Add("LastName", new List<string> {"Васин", "Петров", "Александров", "Машин", "Мишин"});
            dict.Add("Email1", new List<string> {"dfadfsafd", "dfgsdfgs", "fghdfghfgh", "xcvbxcvb", "vbnmvbnmvbn"});
            dict.Add("Email2", new List<string> {"gmail.com", "mail.ru", "yandex.ru", "rambler.ru", "yahoo.com"});

            var userCount = dict["Email1"].Count * dict["Email2"].Count;

            _users = new List<User>();
            for (var i = 0; i < userCount; i++)
            {
                var email = dict["Email1"][(int) Math.Floor(Convert.ToDecimal(i / dict["Email1"].Count))] + "@" +
                            dict["Email2"][i % dict["Email2"].Count];
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
                new Sport {Name = "Плавание"},
                new Sport {Name = "Водное поло"},
                new Sport {Name = "Бокс"}
            };
        }

        //[TearDown]
        [Test]
        public async Task ClearData()
        {
            var testUsers = await _env.GetContext().Users.Where(i => i.PasswordHash == "Test").ToArrayAsync();
            _env.GetContext().RemoveRange(testUsers);
            await _env.GetContext().SaveChangesAsync();
            await LoadSports();
        }

        [Test]
        public async Task LoadClients()
        {
            await LoadTrainers();

            var testUsers = await _env.GetContext().Users.Where(i => i.PasswordHash == "Test").ToArrayAsync();
            var clients = testUsers.Select(user => new Client
            {
                UserId = user.Id,
                Status = ClientStatus.Available
            });

            await _env.GetContext().AddRangeAsync(clients);
            await _env.GetContext().SaveChangesAsync();
        }

        [Test]
        public async Task LoadReviews()
        {
            var reviews = await (from training in _env.GetContext().Trainings.Include(i=>i.Feedback).DefaultIfEmpty()
                          where training.Feedback == null
                let rand = TimeSpan.FromDays(new Random().Next(1, 40))
                let createDate = DateTime.Now - rand
                let score = Convert.ToByte(new Random().Next(1, 6))
                select new Feedback
                {
                    TrainingId = training.Id,
                    CreateDate = createDate,
                    Score = score > 5 ? default(byte?) : score,
                    Description = @"sdfsdfsdfasdgasdgasdgsdfsdfsdfasdgasdgasdgsdfsdfsdfasdgasdgasdgsdfsdfsdfasdgasdgasdg"
                }).ToListAsync();

            await _env.GetContext().AddRangeAsync(reviews);
            await _env.GetContext().SaveChangesAsync();
        }

        [Test]
        public async Task LoadSports()
        {
            var all = await _env.GetContext().Sports.ToArrayAsync();
            _env.GetContext().Sports.RemoveRange(all);

            await _env.GetContext().Sports.AddRangeAsync(_sports);
            await _env.GetContext().SaveChangesAsync();
        }

        [Test]
        public async Task LoadTrainers()
        {
            await LoadUsers();

            var testUsers = await _env.GetContext().Users.Where(i => i.PasswordHash == "Test").ToArrayAsync();
            var trainers = testUsers.Select(user => new Trainer
            {
                UserId = user.Id,
                About =
                    @"fsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsd
                            fsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsd
                            fsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsd
                            fsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsd
                            fsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsd
                            fsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsd
                            fsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsd
                            fsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsd
                            fsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsd
                            fsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsd
                            fsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsd
                            fsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsd
                            fsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsd
                            fsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsd
                            fsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsd
                            fsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsd
                            fsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsd
                            fsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsd
                            fsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsd
                            fsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsd",
                City = "Moscow",
                Country = "Russia",
                Title = "Super Trainer",
                Price = new Random().Next(10, 40) * 100,
                PhotoUrl =
                    "https://odesk-prod-portraits.s3.amazonaws.com/Users:svetoslav-vladim:PortraitUrl_100?AWSAccessKeyId=AKIAIKIUKM3HBSWUGCNQ&Expires=2147483647&Signature=QEHQgSepTHZYdyB9x%2Fe9Vk4ILdo%3D"
            });

            await _env.GetContext().AddRangeAsync(trainers);
            await _env.GetContext().SaveChangesAsync();
        }

        [Test]
        public async Task LoadTeams()
        {
            var testUsers = await _env.GetContext().Trainers.Include(i=>i.User).Where(i => i.User.PasswordHash == "Test").Take(5).ToArrayAsync();
            var teams = testUsers.Select(user => new Team
            {
                AuthorId = user.UserId,
                About =
                    @"fsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsd
                            fsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsd
                            fsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsd
                            fsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsd
                            fsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsd
                            fsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsd
                            fsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsd
                            fsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsd
                            fsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsd
                            fsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsd
                            fsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsd
                            fsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsd
                            fsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsd
                            fsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsd
                            fsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsd
                            fsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsd
                            fsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsd
                            fsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsd
                            fsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsd
                            fsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsd",
                City = "Moscow",
                Country = "Russia",
                PhoneNumber = "+7 (495) 430 62 74",
                Title = "СССР на Матвеевской",
                SubTitle = "Фитнес-клуб",
                TrainerTeams = new List<TrainerTeam> { new TrainerTeam{Trainer = user} },
                PhotoUrl =
                    "https://odesk-prod-portraits.s3.amazonaws.com/Users:svetoslav-vladim:PortraitUrl_100?AWSAccessKeyId=AKIAIKIUKM3HBSWUGCNQ&Expires=2147483647&Signature=QEHQgSepTHZYdyB9x%2Fe9Vk4ILdo%3D"
            });

            await _env.GetContext().AddRangeAsync(teams);
            await _env.GetContext().SaveChangesAsync();
        }

        [Test]
        public async Task LoadTrainerSports()
        {
            await LoadClients();
            var firstSport = await _env.GetContext().Sports.FirstAsync();

            var trainerSports = await _env.GetContext().Trainers.Select(trainer => new TrainerSport
            {
                SportId = firstSport.Id,
                TrainerId = trainer.UserId
            }).ToArrayAsync();

            await _env.GetContext().AddRangeAsync(trainerSports);
            await _env.GetContext().SaveChangesAsync();
        }

        [Test]
        public async Task LoadTrainings()
        {
            var allClients = await _env.GetContext().Clients.ToListAsync();
            var trainerSports = await (from trainerSport in _env.GetContext().TrainerSports
                join sport in _env.GetContext().Sports on trainerSport.SportId equals sport.Id
                where sport.Name == "Бокс"
                select trainerSport).ToArrayAsync();

            var trainings = from trainer in _env.GetContext().Trainers
                join trainerSport in _env.GetContext().TrainerSports on trainer.UserId equals trainerSport.TrainerId
                let rand = TimeSpan.FromDays(new Random().Next(10, 40))
                let startDate = DateTime.Today - rand
                let endDate = DateTime.Now - rand
                where trainerSports.Any(i => i.TrainerId == trainer.UserId)
                select new Training
                {
                    ClientId = allClients.ElementAt(new Random().Next(0, allClients.Count)).UserId,
                    TrainerSportId = trainerSports.First(i => i.TrainerId == trainer.UserId).Id,
                    StartDate = startDate,
                    EndDate = endDate
                };

            await _env.GetContext().AddRangeAsync(trainings);
            await _env.GetContext().SaveChangesAsync();
        }

        //[SetUp]
        [Test]
        public async Task LoadUsers()
        {
            await ClearData();
            await _env.GetContext().AddRangeAsync(_users);
            await _env.GetContext().SaveChangesAsync();
        }
    }
}