namespace BusinessService.Models
{
    public class Vehicle
    {
        public string Id { get; set; }

        public string VIN { get; set; }

        public string PlateNumber { get; set; }

        public int Type { get; set; }

        public string Brand { get; set; }

        public string Model { get; set; }

        public string CompanyId { get; set; }

        public string DriverId { get; set; }
    }
}