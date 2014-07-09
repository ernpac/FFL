using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using FFL.Models;

namespace FFL.Controllers
{
    public class PlayersController : ApiController
    {
        public IEnumerable<Models.Player> getPlayers()
        {
           var context = new TCFFLEntities();
           var drafted = context.Drafts.Select(d => d.PlayerId).AsEnumerable();
           var query = context.Players.Where(p=> p.Status == "ACT" & !drafted.Contains(p.ID)).Select(p => p);
           foreach (Models.Player p in query)
           {
               p.Team = getLogo(p.Team);
           };
            return query.AsEnumerable();
        }

        public IEnumerable<Player> getPlayersbyPOS(string id)
        {
            var context = new TCFFLEntities();
            var query = getPlayers().Where(p => p.Position == id).Select(p => p);
            return query.AsEnumerable();
        }


        public string getLogo(string teem)
        {
            List<Logos> LogoList = new List<Logos>();
            LogoList.Add(new Logos("BAL", "ravens.gif"));
            LogoList.Add(new Logos("ARI", "cards.gif"));
            LogoList.Add(new Logos("ATL", "falcons.gif"));
            LogoList.Add(new Logos("BUF", "bills.gif"));
            LogoList.Add(new Logos("CAR", "panthers.gif"));
            LogoList.Add(new Logos("CHI", "bears.gif"));
            LogoList.Add(new Logos("CIN", "bengals.gif"));
            LogoList.Add(new Logos("CLE", "browns.gif"));
            LogoList.Add(new Logos("DAL", "cowboys.gif"));
            LogoList.Add(new Logos("DEN", "broncos.gif"));
            LogoList.Add(new Logos("DET", "lions.gif"));
            LogoList.Add(new Logos("GB", "packers.gif"));
            LogoList.Add(new Logos("HOU", "texans.gif"));
            LogoList.Add(new Logos("IND", "colts.gif"));
            LogoList.Add(new Logos("JAC", "jaguars.gif"));
            LogoList.Add(new Logos("KC", "chiefs.gif"));
            LogoList.Add(new Logos("MIA", "dolphins.gif"));
            LogoList.Add(new Logos("MIN", "vikings.gif"));
            LogoList.Add(new Logos("NE", "pats.gif"));
            LogoList.Add(new Logos("NO", "saints.gif"));
            LogoList.Add(new Logos("NYG", "giants.gif"));
            LogoList.Add(new Logos("NYJ", "jets.gif"));
            LogoList.Add(new Logos("OAK", "raiders.gif"));
            LogoList.Add(new Logos("PHI", "eagles.gif"));
            LogoList.Add(new Logos("PIT", "steelers.gif"));
            LogoList.Add(new Logos("SD", "chargers.gif"));
            LogoList.Add(new Logos("SEA", "seahawks.gif"));
            LogoList.Add(new Logos("SF", "49ers.gif"));
            LogoList.Add(new Logos("STL", "rams.gif"));
            LogoList.Add(new Logos("TB", "bucs.gif"));
            LogoList.Add(new Logos("TEN", "titans.gif"));
            LogoList.Add(new Logos("WAS", "redskins.gif"));

            var tm = LogoList.Where(n => n.Abbr == teem).Select(n=> n.Filename).FirstOrDefault();
            return tm.ToString();
        }

        
    public class Logos {
        private string abbr;
        private string filename;

        public Logos(string abbr, string filename) {
            this.abbr = abbr;
            this.filename = filename;
        }

        public string Abbr{
            get{return abbr;}
            set{abbr=value;}
        }
        public string Filename{
            get{return filename;}
            set{filename = value;}
        }
    }
    }
}