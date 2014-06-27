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
        void SaveUser();
    }

    public class UserService : IUserService
    {
       private readonly IUserRepository userRepository;
       private readonly IUnitOfWork unitOfWork;

       public UserService(IUnitOfWork unitOfWork, IUserRepository userRepository)
       {
           this.unitOfWork = unitOfWork;
           this.userRepository = userRepository;
       }

        public IEnumerable<ApplicationUser> getUsers()
        {
            return userRepository.GetAll();
        }

        public void SaveUser()
        {
            unitOfWork.Commit();
        }
    }
}
