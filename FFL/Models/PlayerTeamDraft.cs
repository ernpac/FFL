//------------------------------------------------------------------------------
// <auto-generated>
//    This code was generated from a template.
//
//    Manual changes to this file may cause unexpected behavior in your application.
//    Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace FFL.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class PlayerTeamDraft
    {
        public int Id { get; set; }
        public int PlayerId { get; set; }
        public int TeamId { get; set; }
        public double Year { get; set; }
        public Nullable<int> Position { get; set; }
        public Nullable<bool> Keeper { get; set; }
    }
}
