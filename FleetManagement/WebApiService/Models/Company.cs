﻿namespace WebApiService.Models
{
    using System;

    public class Company
    {
        public Guid Id { get; set; }

        public string Name { get; set; }

        public string Address { get; set; }

        public string Bulstat { get; set; }

        public string Email { get; set; }

        public string Telephone { get; set; }
    }
}