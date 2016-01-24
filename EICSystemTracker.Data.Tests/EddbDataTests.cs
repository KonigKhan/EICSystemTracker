using EICSystemTracker.Data.EliteDangerousApiData;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace EICSystemTracker.Data.Tests
{
    [TestClass]
    public class EddbDataTests
    {
        [TestMethod]
        public void GetSystems_Test()
        {
            using (var eddbData = new EddbData())
            {
                var systems = eddbData.GetAllSystems();
            }
        }
    }
}