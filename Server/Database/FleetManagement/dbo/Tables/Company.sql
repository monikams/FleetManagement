CREATE TABLE [dbo].[Company] (
    [Id] UNIQUEIDENTIFIER PRIMARY KEY CONSTRAINT [DF_Company_Id] DEFAULT (newsequentialid()) NOT NULL,
	[Name] NVARCHAR (256) NOT NULL,
    [Address]   NVARCHAR(50) NOT NULL,
    [Bulstat] NVARCHAR (16)  NOT NULL, 
    [Email] NVARCHAR(16) NOT NULL, 
    [Telephone] NVARCHAR(16) NULL,
);

	