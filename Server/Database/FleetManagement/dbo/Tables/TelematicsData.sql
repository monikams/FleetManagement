CREATE TABLE [dbo].[TelematicsData] (
    [Id] UNIQUEIDENTIFIER PRIMARY KEY CONSTRAINT [DF_TelematicsData_Id] DEFAULT (newsequentialid()) NOT NULL,
	[VIN] NVARCHAR(256) NOT NULL,
	[CurrentSpeed] INT NULL,
    [FuelLevel]   INT NULL,
    [FuelUsed] INT  NULL, 
    [Longitude] FLOAT NULL, 
    [Latitude] FLOAT NULL, 
    [RPM] INT NULL, 
    [EngineSpeed] INT NULL, 
    [EngineHours] INT NULL, 
    [Mileage] INT NULL, 
    [IsDoorOpen] BIT NULL, 
    [Idling] TIME NULL, 
    [Ignition] BIT NULL, 
    [SeatBelt] BIT NULL, 
    [HarshAccelaration] BIT NULL, 
    [HarshBraking] BIT NULL, 
    [HarshCornering] BIT NULL, 
    [TailGating] BIT NULL,
);

	