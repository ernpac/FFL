using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FFL.Models
{
    public class DraftOrderMVVM
    {
        public int Id;
        public int TeamId;
        public string TeamName;
        public int Position;
        public long Year;
        public string Logo;
        public string Owner;
    }

    public class TeamDraft
    {
        public int TeamId { get; set; }
        public string TeamName { get; set; }
        public IEnumerable<Player> Players { get; set; }
    }
    
}