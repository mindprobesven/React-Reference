import express from 'express';
interface IValidationSchema {
    run: (req: express.Request) => Promise<unknown[]>;
}
declare const validateQuery: (validationSchema: IValidationSchema) => (req: express.Request, res: express.Response, next: express.NextFunction) => Promise<void>;
export default validateQuery;
//# sourceMappingURL=validateQuery.d.ts.map