﻿//------------------------------------------------------------------------------
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
    using System.Data.Entity;
    using System.Data.Entity.Infrastructure;
    
    public partial class TCFFLEntities : DbContext
    {
        public TCFFLEntities()
            : base("name=TCFFLEntities")
        {
        }
    
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            throw new UnintentionalCodeFirstException();
        }
    
        public DbSet<Draft_Current> Draft_Current { get; set; }
        public DbSet<DraftOrder> DraftOrders { get; set; }
        public DbSet<Draft> Drafts { get; set; }
        public DbSet<Player> Players { get; set; }
        public DbSet<PlayerTeamDraft> PlayerTeamDrafts { get; set; }
        public DbSet<Team> Teams { get; set; }
        public DbSet<Testing> Testings { get; set; }
    }
}
