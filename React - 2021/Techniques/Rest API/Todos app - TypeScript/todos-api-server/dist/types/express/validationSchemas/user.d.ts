declare const userValidationSchema: import("express-validator").ValidationChain[] & {
    run: (req: import("express-validator/src/base").Request) => Promise<unknown[]>;
};
export default userValidationSchema;
//# sourceMappingURL=user.d.ts.map