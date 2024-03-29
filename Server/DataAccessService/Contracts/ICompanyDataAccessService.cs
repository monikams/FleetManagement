﻿namespace DataAccessService.Contracts
{
    using System.Collections.Generic;
    using System.Threading.Tasks;

    using DataAccessService.Models;

    public interface ICompanyDataAccessService
    {
        Task<IEnumerable<Company>> GetAll();

        Task<Company> GetById(string companyId);

        Task<Company> PostCompany(Company company);

        Task<IEnumerable<Company>> GetByUserId(string userId);

        Task DeleteCompany(string companyId);

        Task<Company> EditCompany(EditCompany company);
    }
}