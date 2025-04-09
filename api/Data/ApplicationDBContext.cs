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

        // TODO: expense and percentage mapping

        protected override void OnModelCreating(ModelBuilder modelBuilder) {
            // Join tables for many-to-many relationships
            modelBuilder.Entity<ExpenseGroup>()
                .HasMany(g => g.Members)
                .WithMany(u => u.ExpenseGroups)
                .UsingEntity(j => j.ToTable("GroupMembers"));
        }
    }
}