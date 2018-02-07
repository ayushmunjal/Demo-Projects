using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CMWebApi.Models
{
    public class Person 
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public long Id { get; set; }

        public Name Name { get; set; }
    }

    public class Name
    {

        [Required, MaxLength(50)]
        public string First { get; set; }

        [Required, MaxLength(50)]
        public string Last { get; set; }
    }


}
