interface IPagerDiv {
    config: IPagerPageConfig;
    cssClass: string;
}


interface IAreaManifest {
    Key: string;
    Title: string;
    UrlToken: string;
    InitialModule: string;
    LoadStyle?: string;
    Sequence?: number;
}

interface IWindowingSettings {
    MoveHandleSelector: string;
    ResizeHandleSelector: string;
    WindowViewModel: IWindowViewModel;
}

interface IWindowViewModel {
    Width: KnockoutObservable<number>;
    Height: KnockoutObservable<number>;
    LocationX: KnockoutObservable<number>;
    LocationY: KnockoutObservable<number>;
    StackingOrder: KnockoutObservable<number>;
    Visible: KnockoutObservable<boolean>;
    Moveable: KnockoutObservable<boolean>;
    Resizeable: KnockoutObservable<boolean>;
    Show();
    Hide();
}

interface ITemplateDefinition { templateId: string; templatePath: string; }

interface IPageNavigation {
    Href: string;
    Title: string;
    Sequence: number;
}

interface IEDStarMapSystem {
    name: string;
}

interface IDictionary<T> {
    add(key: string, value: T): void;
    remove(key: string): void;
    containsKey(key: string): boolean;
    keys(): string[];
    values(): T[];
}

interface IPieChartBinding {
    PieChartData: KnockoutObservableArray<CircularChartData>;
    PieChartOptions: PieChartOptions;
}