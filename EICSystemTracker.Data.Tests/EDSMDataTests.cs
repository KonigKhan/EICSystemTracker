using EICSystemTracker.Data.EliteDangerousApiData;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace EICSystemTracker.Data.Tests
{
    [TestClass]
    public class EDSMDataTests
    {
        [TestMethod]
        public void getsystems()
        {
            var edsmDataObj = new EDSMData();
            var result = edsmDataObj.GetSystemNames(false);
        }
    }
}