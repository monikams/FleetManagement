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

        public static int? GenerateNextCurrentSpeedValue(int? currentSpeed)
        {
            Random random = new Random();

            var slowDownTheSpeed = random.Next(0, 2);

            var levelOne = random.Next(5, 20);
            var levelTwo = random.Next(20, 40);
            var levelThree = random.Next(40, 60);
            var levelFour = random.Next(60, 100);

            int nextValue = 0;
            if (currentSpeed <= levelOne)
            {
                nextValue = levelOne;
            }
            else if (currentSpeed <= levelTwo && currentSpeed >= levelOne)
            {
                nextValue = levelTwo;
            }
            else if (currentSpeed <= levelThree && currentSpeed >= levelTwo)
            {
                nextValue = levelThree;
            }
            else if (currentSpeed <= levelFour && currentSpeed >= levelThree)
            {
                nextValue = levelFour;
            }
            else if (InRange(currentSpeed, 60, 100))
            {
                nextValue = levelFour;
            }
            else if (InRange(currentSpeed, 40, 60))
            {
                nextValue = levelThree;
            }
            else if (InRange(currentSpeed, 20, 40))
            {
                nextValue = levelTwo;
            }
            else if (InRange(currentSpeed, 5, 20))
            {
                nextValue = levelOne;
            }

            if (slowDownTheSpeed == 1)
            {
                nextValue = SlowDownTheSpeed(currentSpeed, levelOne, levelTwo, levelThree, levelFour, nextValue, random);
            }

            return nextValue;
        }

        private static int SlowDownTheSpeed(int? currentSpeed, int levelOne, int levelTwo, int levelThree, int levelFour, int nextValue, Random random)
        {
            if (InRange(currentSpeed, 60, 100))
            {
                nextValue = levelFour - levelOne;
            }
            else if (InRange(currentSpeed, 40, 60))
            {
                nextValue = levelThree - levelOne;
            }
            else if (InRange(currentSpeed, 20, 40))
            {
                nextValue = levelTwo - levelOne;
            }
            else if (InRange(currentSpeed, 5, 20))
            {
                if (currentSpeed != null)
                {
                    nextValue = currentSpeed.Value - random.Next(5, currentSpeed.Value + 1);
                }
            }
            else
            {
                nextValue = 0;
            }

            return nextValue;
        }

        private static bool InRange(int? value, int from, int to)
        {
            if (value >= from && value <= to)
            {
                return true;
            }

            return false;
        }
    }
}
