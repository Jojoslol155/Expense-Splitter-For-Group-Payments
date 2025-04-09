using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Models;
using Microsoft.EntityFrameworkCore;

namespace api.Data
{
    public class ApplicationDBContext : DbContext
    {
        public ApplicationDBContext(DbContextOptions dbContextOptions)
        : base(dbContextOptions) {

        }

        public DbSet<ExpenseGroup> ExpenseGroups { get; set; }

        public DbSet<Expense> Expenses { get; set; }
        
        public DbSet<User> Users { get; set; }

        public DbSet<GroupMember> GroupMembers { get; set; }

        // TODO: expense and percentage mapping

        protected override void OnModelCreating(ModelBuilder modelBuilder) {
            // Join tables for many-to-many relationships
            modelBuilder.Entity<GroupMember>()
                .HasKey(gm => new { gm.ExpenseGroupID, gm.MemberID } );

            modelBuilder.Entity<GroupMember>()
                .HasOne(gm => gm.ExpenseGroup)
                .WithMany(eg => eg.GroupMembers)
                .HasForeignKey(gm => gm.ExpenseGroupID);

            modelBuilder.Entity<GroupMember>()
                .HasOne(gm => gm.Member)
                .WithMany(eg => eg.GroupMembers)
                .HasForeignKey(gm => gm.MemberID);

            modelBuilder.Entity<GroupMember>().ToTable("GroupMembers");
        }
    }
}