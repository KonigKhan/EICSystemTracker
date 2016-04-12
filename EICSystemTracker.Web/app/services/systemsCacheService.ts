/// Use this to store the systems in memory.
class SystemsCacheService {

    private static Systems: Array<IEICSystem> = [];
    private static FactionNames: Array<string> = [];

    public static GetSystems = (): Array<IEICSystem> => {
        return SystemsCacheService.Systems;
    }

    public static SetSystems = (systems: Array<IEICSystem>): void => {
        SystemsCacheService.Systems = systems;
    }

    public static GetFactionNames = (): Array<string> => {
        return SystemsCacheService.FactionNames;
    }

    public static SetFactionNames = (facNames: Array<string>): void => {
        SystemsCacheService.FactionNames = facNames;
    }
}

export default SystemsCacheService;