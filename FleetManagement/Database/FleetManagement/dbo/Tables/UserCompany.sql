﻿CREATE TABLE [dbo].[UserCompany]
(
	[Id] INT NOT NULL PRIMARY KEY
	[User_Id] UNIQUEIDENTIFIER FOREIGN KEY REFERENCES User(Id) NOT NULL,
	[Company_Id] UNIQUEIDENTIFIER FOREIGN KEY REFERENCES Company(Id) NOT NULL,
)
