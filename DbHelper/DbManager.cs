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
    public class DbManager
    {
        private string _conString;
        public DbManager(string conString)
        {
            _conString = conString;
        }
        public static void  SetupDb(string conString)
        {
           //_conString = conString;
            using (SqliteDb myDb = new SqliteDb(conString))
            {
                myDb.Database.EnsureCreated();
                var dirtyData = myDb.Admin.ToArray();
                if(dirtyData.Count() > 0)
                {
                    myDb.Admin.RemoveRange(dirtyData);
                    myDb.SaveChanges();
                }

                List<Admin> books = new List<Admin>()
                {
                    new Admin() {UserId=1, FirstName = "Admin", LastName = "System",  Address= "blk 56, Center Stree 20, ShangHai, China" ,UpdateDate=DateTime.Now},
                    new Admin() {UserId=2, FirstName = "Tom", LastName = "Song",  Address= "blk 56, Center Stree 20, ShangHai, China" ,TelePhone="15821987226", Email="guoan@qq.com", UpdateDate=DateTime.Now},
                    new Admin() {UserId=3, FirstName = "Jack", LastName = "Liu",  Address= "blk 88, Notherwind Stree 21, England" ,UpdateDate=DateTime.Now},
                    new Admin() {UserId=4, FirstName = "Peter", LastName = "Tang",  Address= "blk 88, Notherwind Stree 21, England" ,Email="1122@qq.com",UpdateDate=DateTime.Now},
                    new Admin() {UserId=5, FirstName = "Alien", LastName = "long",  Address= "blk 88, Notherwind Stree 21, England" ,Email="llkjk@qq.com",UpdateDate=DateTime.Now},
                    new Admin() {UserId=6, FirstName = "Micheal", LastName = "see",  Address= "blk 88, Notherwind Stree 21, England" ,UpdateDate=DateTime.Now}
                };

                myDb.Admin.AddRange(books);
                int count = myDb.SaveChanges();
            }
        }
        public  List<Admin> GetAllUser ()
        {
            using (SqliteDb myDb = new SqliteDb(_conString))
            {
                return myDb.Admin.ToList();
            }
            
        }
        public  Admin GetUserById (int id)
        {
            using (SqliteDb myDb = new SqliteDb(_conString))
            {
                return myDb.Admin.Where(c=>c.UserId == id).SingleOrDefault();
            }
            
        }
        public  Admin GetUserByName (string name)
        {
            using (SqliteDb myDb = new SqliteDb(_conString))
            {
                return myDb.Admin.Where(c=>c.FirstName == name).SingleOrDefault();
            }
            
        }
        public  int RemoveUserById (int id)
        {
            using (SqliteDb myDb = new SqliteDb(_conString))
            {
                var temp =  GetUserById (id);
                myDb.Admin.Remove(temp);
                int count = myDb.SaveChanges();
                return count;
            }
            
        }
        public  int UpdateUser (Admin user)
        {
            using (SqliteDb myDb = new SqliteDb(_conString))
            {
                
                myDb.Admin.Update(user);
                int count = myDb.SaveChanges();
                return count;
            }
            
        }
        public  int AddNewUser (Admin user)
        {
            using (SqliteDb myDb = new SqliteDb(_conString))
            {
                
                myDb.Admin.Add(user);
                int count = myDb.SaveChanges();
                return count;
            }

        }

    }
    
}