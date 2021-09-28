using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.Http;
using MvcDemo.Models;
using MvcDemo.DbHelper;
namespace MvcDemo.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;

        private  DbManager _dbManager;
        public HomeController(ILogger<HomeController> logger, DbManager dbman)  //you also can creat db context in here
        {
            _logger = logger;
            _dbManager =dbman;
        }

        public IActionResult Index()
        {   
            ViewBag.IsLogin = 0;
            var sess = HttpContext.Session.GetString("name");
            if(sess != null)
                ViewBag.IsLogin = 1;
           
            return View();
        }

        public JsonResult GetAllUser()
        {
            return Json(_dbManager.GetAllUser());
        }

        public JsonResult GetUserById(int id)
        {
            return Json(_dbManager.GetUserById(id));
        }        

        ///login function, set session
        public JsonResult GetUserByName(string name)
        {
            Admin user = _dbManager.GetUserByName(name);
            if(user != null)
            {
                HttpContext.Session.SetString("name",user.FirstName);
            }
            return Json(user);
        }

        public JsonResult AddUser(Admin user)
        {
            return Json(_dbManager.AddNewUser(user));
        }

        public JsonResult UpdateUser(Admin user)
        {
            if(user != null)
                user.UpdateDate = DateTime.Now;
            return Json(_dbManager.UpdateUser(user));
        }

        public JsonResult DeleteUser(int id)
        {
            return Json(_dbManager.RemoveUserById(id));
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
