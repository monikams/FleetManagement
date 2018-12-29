INSERT INTO dbo.Services
(
   Id,
   Name,
   Description,
   Created, 
   TimeRule,
   TimeRuleEntity,
   TimeReminder,
   TimeReminderEntity,
   NextServiceTime,
   MileageRule,
   MileageReminder,
   NextServiceMileage,
   VehicleId,
   BasedOn
)
VALUES
(
    'r26655ed-c121-4f80-bd67-5bb57fa52cdc', -- Id - nvarchar
    'Fuel change', -- Name - nvarchar
    'Some description', -- Description - nvarchar

    '6/19/2008 7:00:00 AM +00:00', -- Created 
	 5, -- TimeRule
	 1, -- TimeRuleEntity
	 1, -- TimeReminder
	 1, -- TimeReminderEntity
	'6/24/2008 7:00:00 AM +00:00', -- NextServiceTime

    100000, -- MileageRule - int
	25000, -- MileageReminder - int
    150000, -- NextServiceMileage - datetimeoffset
       
    '00bf2ce9-6fcf-4586-b768-e7ee082b32b4', -- VehicleId - nvarchar
	0
)