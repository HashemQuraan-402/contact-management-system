using System.ComponentModel.DataAnnotations;

namespace Contactly.Models.Dtos
{
    public record CreateContactRequestDto
    (
         [Required][StringLength(50)] string Name,
         [EmailAddress][StringLength(150)] string? Email,
         [Required][StringLength(15)] string Phone,
         [Required] bool Favorite
    );
}
