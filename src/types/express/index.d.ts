declare namespace Express {
  export interface Request {
    user?: Record<string, any>;
    files?: Record<string, any>;
  }
}
