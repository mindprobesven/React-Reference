import express from 'express';
interface ResponseError {
    (req: express.Request, res: express.Response, status: number, message: string, error: Record<string, unknown>[]): void;
    (req: express.Request, res: express.Response, status: number, message: null, error: Error): void;
    (req: express.Request, res: express.Response, status: number, message: string, error: null): void;
}
declare const responseError: ResponseError;
export default responseError;
//# sourceMappingURL=error.d.ts.map