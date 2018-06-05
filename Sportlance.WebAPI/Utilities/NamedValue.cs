namespace Sportlance.WebAPI.Utilities
{
    public class NamedValue<T>
    {
        public string Name;
        public T Value;

        public NamedValue(string name, T value)
        {
            Name = name;
            Value = value;
        }
    }

    public static class NamedValue
    {
        public static NamedValue<T> Create<T>(string name, T value)
        {
            return new NamedValue<T>(name, value);
        }
    }
}