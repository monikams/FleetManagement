﻿namespace BusinessService.Contracts
{
    using System.Collections.Generic;
    using System.Threading.Tasks;

    using BusinessService.Models;

    public interface ICompanyBusinessService
    {
        Task<IEnumerable<Company>> GetAll();

        Task<Company> GetById(string companyId);

        Task<Company> PostCompany(Company company);

        Task<IEnumerable<Company>> GetByUserId(string userId);

        Task DeleteCompany(string companyId);

        Task<Company> EditCompany(EditCompany editCompany);
    }
}