﻿CREATE TABLE [dbo].[Driver] (
    [Id] UNIQUEIDENTIFIER PRIMARY KEY CONSTRAINT [DF_Driver_Id] DEFAULT (newsequentialid()) NOT NULL,
	[Name] NVARCHAR (256) NOT NULL,
    [Address]   NVARCHAR(50) NULL,
    [Email] NVARCHAR(16) NOT NULL, 
    [Telephone] NVARCHAR(16) NOT NULL,
);

	