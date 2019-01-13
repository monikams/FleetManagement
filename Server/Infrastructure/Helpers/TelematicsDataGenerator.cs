using System;

namespace Infrastructure.Helpers
{
    public class TelematicsDataGenerator
    {
        public static int? GenerateNextMileageValue(int? currentMillage)
        {
            Random random = new Random();
            int maxDifference = 10;

            var startValue = currentMillage ?? random.Next(100, 200);
            var nextValue = random.Next(startValue, startValue + maxDifference);

            return nextValue;
        }

        public static int? GenerateNextFuelLevelValue(int? currentFuelLevel)
        {
            Random random = new Random();
            var difference = 5;

            var criticalFuelLevel = random.Next(10, 30);
            var normalFuelLevel = random.Next(50, 80);

            var startValue = currentFuelLevel ?? random.Next(criticalFuelLevel, 100);
            var nextValue = startValue <= criticalFuelLevel
                ? random.Next(normalFuelLevel, 100)
                : random.Next(startValue - difference, startValue);

            return nextValue;
        }
    }
}
