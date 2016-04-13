var SystemsCacheService = (function () {
    function SystemsCacheService() {
    }
    SystemsCacheService.Systems = [];
    SystemsCacheService.FactionNames = [];
    SystemsCacheService.GetSystems = function () {
        return SystemsCacheService.Systems;
    };
    SystemsCacheService.SetSystems = function (systems) {
        SystemsCacheService.Systems = systems;
    };
    SystemsCacheService.GetFactionNames = function () {
        return SystemsCacheService.FactionNames;
    };
    SystemsCacheService.SetFactionNames = function (facNames) {
        SystemsCacheService.FactionNames = facNames;
    };
    return SystemsCacheService;
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = SystemsCacheService;
