declare class Mongo {
    private static mongo;
    private isConnected;
    private constructor();
    private initEventListeners;
    private connectToDatabase;
    static get isConnected(): boolean;
    static connect(): Promise<boolean>;
}
export default Mongo;
//# sourceMappingURL=connection.d.ts.map