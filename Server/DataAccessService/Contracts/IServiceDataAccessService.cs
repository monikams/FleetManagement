﻿namespace DataAccessService.Contracts
{
    using System.Collections.Generic;
    using System.Threading.Tasks;

    using DataAccessService.Models;

    public interface IServiceDataAccessService
    {
        Task<Service> GetById(string id);

        Task<IEnumerable<Service>> GetByVehicleId(string vehicleId);

        Task<Service> PostService(PostService service);

        Task<Service> EditService(EditService serviceForEdit);

        Task DeleteService(string serviceId);

        Task<Service> MarkServiceAsDone(Service service);
    }
}