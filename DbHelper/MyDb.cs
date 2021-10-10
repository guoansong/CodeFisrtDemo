using System;
using System.Collections.Generic;
using System.Linq;
using MvcDemo.Models;
using Microsoft.EntityFrameworkCore; 
using Microsoft.EntityFrameworkCore.Design;
using SQLite;
using SQLite.CodeFirst;
namespace   MvcDemo.DbHelper
{

    public class MyDbContext : DbContext
    {
        
        private string _conString;
        public DbSet<Admin> Admin { get { return Set<Admin>(); } }

        public MyDbContext(DbContextOptions<MyDbContext> options):base(options)
        {
            
        }
        public MyDbContext(string conString):base()
        {
            _conString = conString;
        }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if(_conString != null){
                 //optionsBuilder.UseSqlite(_conString);     
                 optionsBuilder.UseMySQL(_conString);    //get connection string         
            }
        }

    }

}
