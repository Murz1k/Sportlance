using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Xml.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Sportlance.WebAPI.Core;
using Sportlance.WebAPI.Core.Options;

namespace Sportlance.WebAPI
{
    public class SiteMapController : Controller
    {
        private readonly AppDbContext _context;
        private readonly SiteOptions _siteOptions;
        private readonly ILogger<SiteMapController> _logger;

        public SiteMapController(
            ILogger<SiteMapController> logger,
            IOptions<SiteOptions> siteOptions, AppDbContext context)
        {
            _context = context;
            _siteOptions = siteOptions.Value;
            _logger = logger;
        }

        [Produces("application/xml")]
        [HttpGet("sitemap.xml")]
        public async Task<IActionResult> BuildSitemap()
        {
            _logger.LogInformation("Запрашивается sitemap.xml");

            XDocument xdoc = new XDocument();
            XNamespace ns = "http://www.sitemaps.org/schemas/sitemap/0.9";

            XElement sitemapindex = new XElement(ns + "sitemapindex");

            var trainersQuery = _context.Trainers.Include(i => i.User).Where(i => !i.User.IsDeleted);
            var trainersTasksCount = (int)Math.Ceiling((double)trainersQuery.Count() / 50000);

            for (int j = 0; j < trainersTasksCount; j++)
            {
                await trainersQuery.Take(1).Skip(j * 50000).ForEachAsync(t =>
                {
                    XElement sitemap = new XElement("sitemap");
                    XElement loc = new XElement("loc", $"{_siteOptions.Root}/sitemap/trainers{j}.xml");

                    sitemap.Add(loc);

                    sitemapindex.Add(sitemap);
                });
            }

            var teamsQuery = _context.Teams;
            var teamsTasksCount = (int)Math.Ceiling((double)teamsQuery.Count() / 50000);

            for (int j = 0; j < teamsTasksCount; j++)
            {
                await teamsQuery.Take(1).Skip(j * 50000).ForEachAsync(t =>
                {
                    XElement sitemap = new XElement("sitemap");
                    XElement loc = new XElement("loc", $"{_siteOptions.Root}/sitemap/teams{j}.xml");

                    sitemap.Add(loc);

                    sitemapindex.Add(sitemap);
                });
            }

            xdoc.Add(sitemapindex);
            return Content(xdoc.ToString(), "application/xml");
        }

        [Produces("application/xml")]
        [HttpGet("sitemap/teams{pageId}.xml")]
        public async Task<IActionResult> BuildSitemapTeamsPage(int pageId)
        {
            _logger.LogInformation($"Запрашивается sitemap/teams{pageId}.xml");

            XDocument xdoc = new XDocument();
            XNamespace ns = "http://www.sitemaps.org/schemas/sitemap/0.9";

            XElement urlset = new XElement(ns + "urlset");

            await _context.Teams.Take(50000).Skip(pageId * 50000).ForEachAsync(t =>
            {
                XElement url = new XElement("url");
                XElement loc = new XElement("loc", $"{_siteOptions.Root}/trainers/{t.Id}");
                XElement priority = new XElement("priority", "0.3");
                XElement changefreq = new XElement("changefreq", "weekly");

                url.Add(loc);
                url.Add(priority);
                url.Add(changefreq);

                urlset.Add(url);
            });

            if (urlset.Value == string.Empty)
            {
                return NotFound();
            }

            xdoc.Add(urlset);

            return Content(xdoc.ToString(), "application/xml");
        }

        [Produces("application/xml")]
        [HttpGet("sitemap/trainers{pageId}.xml")]
        public async Task<IActionResult> BuildSitemapTrainerPage(int pageId)
        {
            _logger.LogInformation($"Запрашивается sitemap/trainers{pageId}.xml");

            XDocument xdoc = new XDocument();
            XNamespace ns = "http://www.sitemaps.org/schemas/sitemap/0.9";

            XElement urlset = new XElement(ns + "urlset");

            await _context.Trainers.Include(i => i.User).Where(i => !i.User.IsDeleted).Take(50000).Skip(pageId * 50000).ForEachAsync(t =>
            {
                XElement url = new XElement("url");
                XElement loc = new XElement("loc", $"{_siteOptions.Root}/trainers/{t.UserId}");
                XElement priority = new XElement("priority", "0.3");
                XElement changefreq = new XElement("changefreq", "weekly");

                url.Add(loc);
                url.Add(priority);
                url.Add(changefreq);

                urlset.Add(url);
            });

            if (urlset.Value == string.Empty)
            {
                return NotFound();
            }

            xdoc.Add(urlset);

            return Content(xdoc.ToString(), "application/xml");
        }
    }
}
