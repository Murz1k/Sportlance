using System;
using System.Collections.Generic;
using System.Linq;

namespace Sportlance.WebAPI.Utilities
{
    public static class EnumUtils
    {
        public static T Parse<T>(string str) where T : struct
        {
            if (Enum.TryParse(str, out T code))
            {
                return code;
            }
            throw new Exception($"Cannot parse {str} as enum {typeof(T)}");
        }

        public static Dictionary<T, string> GetNamesDictionary<T>() where T : struct =>
            Enum.GetNames(typeof(T)).Select((x, i) => (x, Parse<T>(x))).ToDictionary(x => x.Item2, x => x.Item1);

        public static List<NamedValue<T>> GetKeyValues<T>() where T : struct =>
            Enum.GetNames(typeof(T)).Select(x => NamedValue.Create(x, Parse<T>(x))).ToList();

        public static IEnumerable<Enum> GetFlags(Enum input)
        {
            return Enum.GetValues(input.GetType()).Cast<Enum>().Where(input.HasFlag);
        }
    }
}
