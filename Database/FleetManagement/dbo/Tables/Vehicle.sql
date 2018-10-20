CREATE TABLE [dbo].[Vehicle] (
    [Id]          UNIQUEIDENTIFIER PRIMARY KEY CONSTRAINT [DF_Vehicle_Id] DEFAULT (newsequentialid()) NOT NULL,
    [Driver_Id]   UNIQUEIDENTIFIER NULL,
	[Company_Id]  UNIQUEIDENTIFIER FOREIGN KEY REFERENCES Company(Id) NULL,
    [VIN]         NVARCHAR (256)   NOT NULL,
    [PlateNumber] NVARCHAR (16)    NOT NULL,
	[Type] [int] NOT NULL,
	[Brand] [nvarchar](50) NOT NULL,
	[Model] [nvarchar](50) NULL,
);

