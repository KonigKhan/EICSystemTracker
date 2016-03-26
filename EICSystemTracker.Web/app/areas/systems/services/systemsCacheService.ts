/// Use this to store the systems in memory.
class SystemsCacheService {

    private static Systems: Array<IEICSystem> = [];

    public static GetSystems = (): Array<IEICSystem> => {
        return SystemsCacheService.Systems;
    }

    public static SetSystems = (systems: Array<IEICSystem>): void => {
        SystemsCacheService.Systems = systems;
    }
}

export default SystemsCacheService;