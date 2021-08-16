declare const idValidationSchema: import("express-validator").ValidationChain[] & {
    run: (req: import("express-validator/src/base").Request) => Promise<unknown[]>;
};
export default idValidationSchema;
//# sourceMappingURL=id.d.ts.map