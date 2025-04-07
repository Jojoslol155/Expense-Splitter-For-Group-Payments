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
            // Join table for many-to-many relationships
            modelBuilder.Entity<User>().
                HasMany(u => u.ExpenseGroups)
                .WithMany(eg => eg.Members)
                .UsingEntity(j => j.ToTable("GroupMembers"));
        }
    }
}