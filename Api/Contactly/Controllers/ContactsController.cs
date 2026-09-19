using Contactly.Data;
using Contactly.Models.Domain;
using Contactly.Models.Dtos;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Contactly.Controllers
{
    // http://localhost:xxxx/api/Contacts
    [Route("api/[controller]")]
    [ApiController]
    public class ContactsController : ControllerBase
    {
        private readonly ContactDbContext dbContext;

        public ContactsController(ContactDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        // GET /api/Contacts
        [HttpGet]
        public async Task<IActionResult> GetAllContacts()
        {
            return Ok(await dbContext.Contacts.AsNoTracking().ToListAsync());
        }


        // GET /api/Contacts/{id}
        [HttpGet]
        [Route("{id}")]
        public async Task<IActionResult> GetContactById(Guid id)
        {
            var contact = await dbContext.Contacts.FindAsync(id);

            if (contact is null)
            {
                return NotFound();
            }

            GetContactResponseDto getConDto = new(
                    contact.Id,
                    contact.Name,
                    contact.Email,
                    contact.Phone,
                    contact.Favorite
                );

            return Ok(getConDto);
        }


        // POST /api/Contacts
        [HttpPost]
        public async Task<IActionResult> CreateContact(CreateContactRequestDto request)
        {
            var domainModelContact = new Contact {
                Name = request.Name,
                Email = request.Email,
                Phone = request.Phone,
                Favorite = request.Favorite,
            };

            await dbContext.Contacts.AddAsync(domainModelContact);
            await dbContext.SaveChangesAsync();

            GetContactResponseDto getConDto = new(
                    domainModelContact.Id,
                    domainModelContact.Name,
                    domainModelContact.Email,
                    domainModelContact.Phone,
                    domainModelContact.Favorite
                );

            return CreatedAtAction(nameof(GetContactById), new { id = domainModelContact.Id }, getConDto);
        }


        // PUT api/Contacts/{id}
        [HttpPut]
        [Route("{id}")]
        public async Task<IActionResult> UpdateContact(Guid id, UpdateContactRequestDto request)
        { 
            var contact = await dbContext.Contacts.FindAsync(id);
            if(contact is null)
            {
                return NotFound();
            }
            contact.Name = request.Name;
            contact.Email = request.Email;
            contact.Phone = request.Phone;
            contact.Favorite = request.Favorite;

            await dbContext.SaveChangesAsync();

            return NoContent();
        }


        // DELETE /api/Contacts/{id}
        [HttpDelete]
        [Route("{id}")]
        public async Task<IActionResult> DeleteContact(Guid id) 
        {
            await dbContext.Contacts.Where(contact => contact.Id == id).ExecuteDeleteAsync();
            return NoContent();
        }

    }
}
