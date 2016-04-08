interface PagerStatic {
    extendWithPage(viewModel: any);
    start();
    start(startingPage: string);
    onSourceError: { add: (any) => void };
}
interface IPagerPage { }
interface IPagerPageConfig {
    id: string;
    title: string;
    showElement?(page, callback: () => void);
    hideElement?(page, callback: () => void);

    sourceLoaded?: (IPagerPage) => void;
    source?: string;

    sourceOnShow?: any;
    sourceCache?: boolean;

    withOnShow?: (any) => any;
    bind?: any;
}

declare var pager: PagerStatic;

declare module "pager" {
    export = pager;
}