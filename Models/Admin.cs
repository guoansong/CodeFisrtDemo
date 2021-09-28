using System;
using System.Linq;
using System.Data.Entity;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
namespace MvcDemo.Models
{
    //[Table("Admins")]
    public class Admin
    {
        [Key]
        public int UserId {get; set;}

        public string FirstName{get;set;}

        public string LastName{get;set;}

        public string Address{get;set;}

        public string TelePhone{get;set;}

        public string Email{get;set;}

        public  DateTime UpdateDate{get;set;}
        

    }
}