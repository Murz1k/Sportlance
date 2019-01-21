using System.Threading.Tasks;

namespace Sportlance.Common.Providers
{
    public interface IProvier
    {
        Task InitializeAsync();
    }
}