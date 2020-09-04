export const HOST: string = process.env.HOST || '0.0.0.0';
export const PORT: number = parseInt(process.env.PORT || '3000');
export const MONGODB_URI: string = process.env.MONGODB_URI || 'mongodb://localhost:27017/';
export const JWT_SECRET: string = process.env.JWT_SECRET || 'secret';
