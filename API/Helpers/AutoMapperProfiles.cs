using System.Linq;
using API.DTOs;
using API.Entities;
using API.Extensions;
using AutoMapper;

namespace API.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<AppUser, MemberDto>()
                .ForMember(dto => dto.PhotoUrl,
                            options => options
                            .MapFrom(entity => entity.Photos.FirstOrDefault(p => p.IsMain).PhotoUrl))
                .ForMember(dto => dto.Age,
                            options => options.MapFrom(entity => entity.DoB.GetAge()));


            CreateMap<Photo, PhotoDto>();
        }
    }
}