import express from 'express';
interface ResponseError {
    (req: express.Request, res: express.Response, message: string, error: Array<Record<string, unknown>>, status?: number): void;
    (req: express.Request, res: express.Response, message: null, error: Error, status?: number): void;
    (req: express.Request, res: express.Response, message: string, error: null, status?: number): void;
}
declare const responseError: ResponseError;
export default responseError;
//# sourceMappingURL=error.d.ts.map