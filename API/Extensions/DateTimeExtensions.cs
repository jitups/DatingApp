using System;

namespace API.Extensions
{
    public static class DateTimeExtensions
    {
        public static int GetAge(this DateTime DoB)
        {
            var today = DateTime.Today;
            var age = today.Year - DoB.Year;
            if (DoB.Date > today.AddYears(-age).Date) age--;
            return age;
        }
    }
}