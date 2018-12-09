﻿namespace BusinessService.Contracts
{
    using System.Collections.Generic;
    using System.Threading.Tasks;

    using BusinessService.Models;

    public interface IServiceBusinessService
    {
        Task<Service> GetById(string id);

        Task<IEnumerable<Service>> GetByVehicleId(string vehicleId);
    }
}