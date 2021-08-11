declare enum Status {
    OK = "OK",
    Fail = "Fail",
    Duplicate = "Duplicate"
}
declare class Mongo {
    private static mongo;
    private isConnected;
    private constructor();
    private initEventListeners;
    private connectToDatabase;
    static get isConnected(): boolean;
    static connect(): Promise<Status>;
}
export default Mongo;
//# sourceMappingURL=connection.d.ts.map