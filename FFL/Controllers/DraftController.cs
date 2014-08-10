using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using FFL.Models;
using Microsoft.AspNet.SignalR;

namespace FFL.Controllers
{
    public class DraftController : ApiController
    {
        public Draft GetDraftInfo(long yr)
        {
            var context = new TCFFLEntities();
            var info = context.Drafts.Where(d => d.Year.Year == yr).Select(d => d).FirstOrDefault();
            return info;
        }
        public IEnumerable<DraftOrderMVVM> GetDraftOrder(long yr)
        {
            var context = new TCFFLEntities();
            var drft = from d in context.DraftOrders
                       join t in context.Teams
                            on d.TeamId equals t.Id into joined
                       from t in joined.DefaultIfEmpty()
                       orderby d.Position ascending
                       select new DraftOrderMVVM
                       {
                           Id = d.Id,
                           TeamId = d.TeamId,
                           TeamName = t.TeamName,
                           Position = d.Position,
                           Year = yr,
                           Logo = t.Logo,
                           Owner = t.Owner
                       };
            return drft.AsEnumerable();
        }
        public class CurrentPick
        {
            public string Team { get; set; }
            public int Pick { get; set; }
            public string Player { get; set; }
        }

        public void draftPlayer(int pId, int tId, int pickNo)
        {
            var context = new TCFFLEntities();
            DateTime yr = DateTime.Now;

            Draft dr = new Draft()
            {
                TeamId = tId,
                PlayerId = pId,
                Place = pickNo,
                Year = yr
            };
            context.Drafts.Add(dr);
            context.SaveChanges();

            CurrentPick cp = new CurrentPick()
            {
                Team = context.Teams.Find(tId).TeamName.ToString(),
                Player = context.Players.Find(pId).PlayerName.ToString(),
                Pick = pickNo
            };
            string pick = cp.Team + ";" + cp.Player + ";" + cp.Pick;
            var draftHub = GlobalHost.ConnectionManager.GetHubContext<DraftHub>();
            draftHub.Clients.All.broadcastMessage(pick);
            
        }

        public void updateDraftCurrents(Draft_Current current)
        {
            using (TCFFLEntities db = new TCFFLEntities())
            {
                var currents = db.Draft_Current.FirstOrDefault();

                if(currents == null)
                {
                    Draft_Current curr = new Draft_Current()
                        {
                            CurrentTeamId = current.CurrentTeamId,
                            CurrentOverall = current.CurrentOverall,
                            CurrentPick = current.CurrentPick,
                            CurrentRound = current.CurrentRound
                        };
                    db.Draft_Current.Add(curr);
                    db.SaveChanges();
                }
                else
                {
                    currents.CurrentTeamId = current.CurrentTeamId;
                    currents.CurrentRound = current.CurrentRound;
                    currents.CurrentOverall = current.CurrentOverall;
                    if(current.CurrentPick > 9)
                    {
                        currents.CurrentPick = 0;
                    }
                    else
                    {
                        currents.CurrentPick = current.CurrentPick;
                    }
                    db.SaveChanges();
                }
            }
        }

        public Draft_Current getCurrents()
        {
            var context = new TCFFLEntities();

            var results = context.Draft_Current.OrderByDescending(c => c.Id).Select(c => c).FirstOrDefault();
            if (results == null)
            {
                results = new Draft_Current()
                {
                    CurrentOverall = 0,
                    CurrentPick = 0,
                    CurrentRound = 1
                };
            }
            return results;
        }

        public void UpdateDraftOrder(IEnumerable<DraftOrderMVVM> draft)
        {
            var context = new TCFFLEntities();

            foreach (var d in draft)
            {
                var ord = context.DraftOrders.Where(dr => dr.TeamId == d.TeamId & dr.Year == d.Year).Select(dr => dr).FirstOrDefault();
                if (ord != null)
                {
                    ord.Position = d.Position;
                    context.SaveChanges();
                }
            }
        }

        public IEnumerable<CurrentPick> getDraftResults()
        {
            var context = new TCFFLEntities();

            var results = (context.Drafts.AsEnumerable()
                .Where(d => d.Year.Year == DateTime.Now.Year)
                .Select(d => new CurrentPick()
                {
                    Team = context.Teams.Find(d.TeamId).TeamName.ToString(),
                    Player = context.Players.Find(d.PlayerId).PlayerName.ToString(),
                    Pick = d.Place
                })).AsEnumerable();

            return results.OrderByDescending(d => d.Pick);
        }
    }
}