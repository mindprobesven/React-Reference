import express from 'express';
declare type ResponseError = {
    req: express.Request;
    res: express.Response;
    status: number;
    message?: string;
    payload?: Array<Record<string, unknown>>;
    error?: Error;
};
declare const responseError: ({ req, res, status, message, payload, error, }: ResponseError) => express.Response;
export default responseError;
//# sourceMappingURL=error.d.ts.map