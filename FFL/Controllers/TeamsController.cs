using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using FFL.Models;

namespace FFL.Controllers
{
    public class TeamsController : ApiController
    {
        // GET api/<controller>
        public IEnumerable<Team> getTeams()
        {
            var context = new TCFFLEntities();

            var teamlist = from t in context.Teams
                        select t;

            return teamlist.AsEnumerable();
        }

        [HttpPut]
        public void updateTeam(Team teem)
        {
            var context = new TCFFLEntities();

            var teamedit = context.Teams.Where(t => t.Id == teem.Id).FirstOrDefault();

            if (teamedit != null)
            {
                teamedit.TeamName = teem.TeamName;
                teamedit.Owner = teem.Owner;
                teamedit.OwnerEmail = teem.OwnerEmail;
                teamedit.Logo = teem.Logo;
                context.SaveChanges();
            }
        }

        [HttpPost]
        public void addTeam(Team teem)
        {
            var context = new TCFFLEntities();
            context.Teams.Add(teem);
            context.SaveChanges();
        }

        [HttpGet]
        public IEnumerable<TeamDraft> getDraftResults()
        {
            var context = new TCFFLEntities();

            var results = context.Teams.Select(t => new TeamDraft
            {
                TeamId = t.Id,
                TeamName = t.TeamName
            }).ToList();

            foreach(TeamDraft teem in results)
            {
                var players = (from dr in context.Drafts
                               join pl in context.Players on dr.PlayerId equals pl.ID
                               where dr.TeamId == teem.TeamId
                               select pl).AsEnumerable();
                teem.Players = players;
            }

            return results;
        }
       
    }
}