declare enum Status {
    OK = "OK",
    Fail = "Fail",
    Duplicate = "Duplicate"
}
export default class ExpressServer {
    private static server;
    private express;
    private constructor();
    private configure;
    private listen;
    static start(): Promise<Status>;
}
export {};
//# sourceMappingURL=app.d.ts.map