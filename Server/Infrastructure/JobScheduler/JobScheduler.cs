namespace Infrastructure.JobScheduler
{
    using System.Collections.Generic;

    using Infrastructure.JobScheduler.Jobs;

    using Quartz;
    using Quartz.Impl;

    public static class JobScheduler
    {
        public static void Start()
        {
            var scheduler = StdSchedulerFactory.GetDefaultScheduler().Result;
            scheduler.Start();

            ConfigureTriggersAndJobs(scheduler);
        }

        private static void ConfigureTriggersAndJobs(IScheduler scheduler)
        {
            var triggersAndJobs = new Dictionary<IJobDetail, IReadOnlyCollection<ITrigger>>();

            // SeedTelematicsJob
            var seedTelematicsJob = JobBuilder.Create<SeedTelematicsJob>().Build();
            var seedTelematicsJobTriggers = new List<ITrigger>
                                                {
                                                    TriggerBuilder
                                                        .Create().WithDailyTimeIntervalSchedule(
                                                            s => s.WithIntervalInHours(10).OnEveryDay()
                                                                  .StartingDailyAt(
                                                                      TimeOfDay.HourAndMinuteOfDay(
                                                                          0,
                                                                          0))).Build()
                                                };

            triggersAndJobs.Add(seedTelematicsJob, seedTelematicsJobTriggers);

            //SendTimeOverdueEmailsJob
            var sendTimeOverdueEmailsJob = JobBuilder.Create<SendTimeOverdueEmailsJob>().Build();
            var sendTimeOverdueEmailsJobTriggers = new List<ITrigger>
            {
                TriggerBuilder
                    .Create().WithDailyTimeIntervalSchedule(
                        s => s.WithIntervalInSeconds(10).OnEveryDay()
                            .StartingDailyAt(
                                TimeOfDay.HourAndMinuteOfDay(
                                    0,
                                    0))).Build()
            };

            triggersAndJobs.Add(sendTimeOverdueEmailsJob, sendTimeOverdueEmailsJobTriggers);

            //SendTimeReminderEmailJob
            var sendTimeReminderEmailJob = JobBuilder.Create<SendTimeReminderEmailJob>().Build();
            var sendTimeReminderEmailJobTriggers = new List<ITrigger>
            {
                TriggerBuilder
                    .Create().WithDailyTimeIntervalSchedule(
                        s => s.WithIntervalInHours(24).OnEveryDay()
                            .StartingDailyAt(
                                TimeOfDay.HourAndMinuteOfDay(
                                    0,
                                    0))).Build()
            };

            triggersAndJobs.Add(sendTimeReminderEmailJob, sendTimeReminderEmailJobTriggers);


            //SendMileageOverdueEmailsJob
            var sendMileageOverdueEmailsJob = JobBuilder.Create<SendMileageOverdueEmailsJob>().Build();
            var sendMileageOverdueEmailsJobTriggers = new List<ITrigger>
            {
                TriggerBuilder
                    .Create().WithDailyTimeIntervalSchedule(
                        s => s.WithIntervalInHours(24).OnEveryDay()
                            .StartingDailyAt(
                                TimeOfDay.HourAndMinuteOfDay(
                                    0,
                                    0))).Build()
            };

            triggersAndJobs.Add(sendMileageOverdueEmailsJob, sendMileageOverdueEmailsJobTriggers);

            //SendMileageReminderEmailJob
            var sendMileageReminderEmailJob = JobBuilder.Create<SendMileageReminderEmailJob>().Build();
            var sendMileageReminderEmailJobTriggers = new List<ITrigger>
            {
                TriggerBuilder
                    .Create().WithDailyTimeIntervalSchedule(
                        s => s.WithIntervalInHours(24).OnEveryDay()
                            .StartingDailyAt(
                                TimeOfDay.HourAndMinuteOfDay(
                                    0,
                                    0))).Build()
            };

            triggersAndJobs.Add(sendMileageReminderEmailJob, sendMileageReminderEmailJobTriggers);

            scheduler.ScheduleJobs(triggersAndJobs, true);
        }
    }
}