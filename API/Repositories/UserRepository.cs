using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;

namespace API.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly DataContext _dataContext;
        private readonly IMapper _mapper;
        public UserRepository(DataContext dataContext, IMapper mapper)
        {
            _mapper = mapper;
            _dataContext = dataContext;
        }

        public async Task<MemberDto> GetMemberByUsernameAsync(string username)
        {
            return await _dataContext.Users
                        .Where(u => u.UserName == username)
                        .ProjectTo<MemberDto>(_mapper.ConfigurationProvider)
                        .FirstOrDefaultAsync();
        }

        public async Task<IEnumerable<MemberDto>> GetMemberssAsync()
        {
            return await _dataContext.Users
                        .ProjectTo<MemberDto>(_mapper.ConfigurationProvider)
                        .ToListAsync(); ;
        }

        public async Task<AppUser> GetUserByIdAsync(int Id)
        {
            return await _dataContext.Users.FirstOrDefaultAsync(u => u.Id == Id);
        }

        public async Task<AppUser> GetUserByUsernameAsync(string username)
        {
            return await _dataContext.Users
                    .Include(u => u.Photos)
                    .FirstOrDefaultAsync(u => u.UserName == username);
        }

        public async Task<IEnumerable<AppUser>> GetUsersAsync()
        {
            return await _dataContext.Users.ToListAsync();
        }

        public async Task<bool> SaveAllChangesAsync()
        {
            return await _dataContext.SaveChangesAsync() > 0;
        }

        public void Update(AppUser appUser)
        {
            _dataContext.Update(appUser);
        }
    }
}