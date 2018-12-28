namespace WebApiService.Infrastructure.JobScheduler
{
    using System.Collections.Generic;

    using Quartz;
    using Quartz.Impl;

    using WebApiService.Infrastructure.JobScheduler.Jobs;

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

            var seedTelematicsJob = JobBuilder.Create<SeedTelematicsJob>().Build();
            var seedTelematicsJobTriggers = new List<ITrigger>
                                                {
                                                    TriggerBuilder
                                                        .Create().WithDailyTimeIntervalSchedule(
                                                            s => s.WithIntervalInMinutes(20).OnEveryDay()
                                                                  .StartingDailyAt(
                                                                      TimeOfDay.HourAndMinuteOfDay(
                                                                          0,
                                                                          0))).Build()
                                                };

            triggersAndJobs.Add(seedTelematicsJob, seedTelematicsJobTriggers);

            scheduler.ScheduleJobs(triggersAndJobs, true);
        }
    }
}