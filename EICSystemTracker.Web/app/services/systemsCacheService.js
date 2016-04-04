/// Use this to store the systems in memory.
var SystemsCacheService = (function () {
    function SystemsCacheService() {
    }
    SystemsCacheService.Systems = [];
    SystemsCacheService.GetSystems = function () {
        return SystemsCacheService.Systems;
    };
    SystemsCacheService.SetSystems = function (systems) {
        SystemsCacheService.Systems = systems;
    };
    return SystemsCacheService;
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = SystemsCacheService;
//# sourceMappingURL=systemscacheservice.js.map