declare const userQuerySchema: import("express-validator").ValidationChain[] & {
    run: (req: import("express-validator/src/base").Request) => Promise<unknown[]>;
};
export default userQuerySchema;
//# sourceMappingURL=userQuery.d.ts.map