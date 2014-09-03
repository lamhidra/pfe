using PFE.DAL;
using PFE.DAL.Repository;
using PFE.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PFE.Service.Services
{

    public interface IUserService {
        IEnumerable<ApplicationUser> getUsers();

        string GetRoleById(string id);
        IEnumerable<string> GetRoles();
        void SaveUser();
    }

    public class UserService : IUserService
    {
       private readonly IUserRepository userRepository;
       private readonly IUnitOfWork unitOfWork;
       private readonly IDatabaseFactory databaseFactory;

       public UserService(IUnitOfWork unitOfWork, IUserRepository userRepository, IDatabaseFactory databaseFactory)
       {
           this.unitOfWork = unitOfWork;
           this.userRepository = userRepository;
           this.databaseFactory = databaseFactory;
       }

        public IEnumerable<ApplicationUser> getUsers()
        {
            return userRepository.GetAll();
        }


        public IEnumerable<string> GetRoles()
        {
            return ((databaseFactory.Get().Roles.Select(role => role.Name)).ToList());
        }

        public string GetRoleById(string id)
        {
            return "";
        }

        public void SaveUser()
        {
            unitOfWork.Commit();
        }

    }
}
