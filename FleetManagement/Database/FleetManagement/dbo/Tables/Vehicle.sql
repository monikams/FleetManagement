CREATE TABLE [dbo].[Vehicle] (
    [Id]          UNIQUEIDENTIFIER PRIMARY KEY CONSTRAINT [DF_Vehicle_Id] DEFAULT (newsequentialid()) NOT NULL,
    [Driver_Id]   UNIQUEIDENTIFIER FOREIGN KEY REFERENCES Driver(Id) NOT NULL,
	[Company_Id]  UNIQUEIDENTIFIER FOREIGN KEY REFERENCES Company(Id) NOT NULL,
    [VIN]         NVARCHAR (256)   NOT NULL,
    [PlateNumber] NVARCHAR (16)    NOT NULL,
	[Brand] [nvarchar](50) NOT NULL,
	[Model] [nvarchar](50) NULL,
);

