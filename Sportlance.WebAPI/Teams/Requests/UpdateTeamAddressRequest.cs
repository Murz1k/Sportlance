using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Sportlance.WebAPI.Teams.Requests
{
    public class UpdateTeamAddressRequest
    {
        public CreateGeoRequest Geo { get; set; }

        public string City { get; set; }

        public string Address { get; set; }

        public string Country { get; set; }
    }
}
