[assembly: WebActivatorEx.PreApplicationStartMethod(typeof(TestBlanc.Web.App_Start.NinjectWebCommon), "Start")]
[assembly: WebActivatorEx.ApplicationShutdownMethodAttribute(typeof(TestBlanc.Web.App_Start.NinjectWebCommon), "Stop")]

namespace TestBlanc.Web.App_Start
{
    using System;
    using System.Web;

    using Microsoft.Web.Infrastructure.DynamicModuleHelper;

    using Ninject;
    using Ninject.Web.Common;
    using PFE.DAL;
    using PFE.DAL.Repository;
    using PFE.Service;
    using Ninject.Web.WebApi;
    using PFE.Service.Services;
    using Microsoft.Owin.Security;
    using PFE.Web;
    using PFE.Web.SEO;
    using PFE.Service.GeneratePdfService;

    public static class NinjectWebCommon 
    {
        private static readonly Bootstrapper bootstrapper = new Bootstrapper();

        /// <summary>
        /// Starts the application
        /// </summary>
        public static void Start() 
        {
            DynamicModuleUtility.RegisterModule(typeof(OnePerRequestHttpModule));
            DynamicModuleUtility.RegisterModule(typeof(NinjectHttpModule));
            bootstrapper.Initialize(CreateKernel);
        }
        
        /// <summary>
        /// Stops the application.
        /// </summary>
        public static void Stop()
        {
            bootstrapper.ShutDown();
        }
        
        /// <summary>
        /// Creates the kernel that will manage your application.
        /// </summary>
        /// <returns>The created kernel.</returns>
        private static IKernel CreateKernel()
        {
            var kernel = new StandardKernel();
            try
            {
                kernel.Bind<Func<IKernel>>().ToMethod(ctx => () => new Bootstrapper().Kernel);
                kernel.Bind<IHttpModule>().To<HttpApplicationInitializationHttpModule>();

                RegisterServices(kernel);
                System.Web.Http.GlobalConfiguration.Configuration.DependencyResolver = new NinjectResolver(kernel); 
                return kernel;
            }
            catch
            {
                kernel.Dispose();
                throw;
            }
        }

        /// <summary>
        /// Load your modules or register your services here!
        /// </summary>
        /// <param name="kernel">The kernel.</param>
        private static void RegisterServices(IKernel kernel)
        {

            //Abstractions
            kernel.Bind<IDatabaseFactory>().To<DatabaseFactory>().InSingletonScope();
            kernel.Bind<IUnitOfWork>().To<UnitOfWork>().InSingletonScope();

            //Repositories
            kernel.Bind<IFormationRepository>().To<FormationRepository>();
            kernel.Bind<IFormationExamenRepository>().To<FormationExamenRepository>();
            kernel.Bind<IExamenRepository>().To<ExamenRepository>();
            kernel.Bind<IApprenantRepository>().To<ApprenantRepository>();
            kernel.Bind<IUserRepository>().To<UserRepository>();
            kernel.Bind<IAnnonceRepository>().To<AnnonceRepository>();
            kernel.Bind<IFicheDescriptiveRepository>().To<FicheDescriptiveRepository>();

            //Services
            kernel.Bind<IFormationService>().To<FormationService>();
            kernel.Bind<IApprenantService>().To<ApprenantService>();
            kernel.Bind<IExamenService>().To<ExamenService>();
            kernel.Bind<IFormationExamenService>().To<FormationExamenService>();
            kernel.Bind<IUserService>().To<UserService>();
            kernel.Bind<IAnnonceService>().To<AnnonceService>();
            kernel.Bind<IToPdfStrategy>().To<ToPdfStrategy>();
            kernel.Bind<IToPdfFactory>().To<ToPdfFactory>();


            //Others
            kernel.Bind<ISnapshot>().To<Snapshot>();
        }        
    }


}
