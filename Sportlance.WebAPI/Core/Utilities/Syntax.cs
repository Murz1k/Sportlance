using System;
using System.Collections.Generic;
using System.Linq;

namespace Sportlance.WebAPI.Utilities
{
    public static class Syntax
    {
        public static List<T> List<T>(params T[] items)
        {
            return new List<T>(items);
        }

        public static HashSet<T> HashSet<T>(params T[] items)
        {
            return new HashSet<T>(items);
        }

        public static List<int> Range(int start, int count)
        {
            return Enumerable.Range(start, count).ToList();
        }

        public static void AddRange<T>(this ICollection<T> collection, IEnumerable<T> items)
        {
            foreach (var item in items) collection.Add(item);
        }

        public static Dictionary<K, T> Dict<K, T>(params ValueTuple<K, T>[] list)
        {
            var dict = new Dictionary<K, T>();
            foreach (var x in list) dict.Add(x.Item1, x.Item2);
            return dict;
        }
    }
}