namespace CMApi.Models
{
    public class Person
    {
        public long id { get; set; }
        public Name name { get; set; }
    }

    public class Name
    {
        public string first { get; set; }
        public string last { get; set; }
    }
}
