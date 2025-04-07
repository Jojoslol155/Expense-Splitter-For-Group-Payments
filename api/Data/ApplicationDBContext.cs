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
        
    }
}