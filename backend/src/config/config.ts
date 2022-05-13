export const config = {
    PORT: process.env.PORT || 5200,

    DB_PORT: Number(process.env.DB_PORT),
    DB_HOST: process.env.DB_HOST,
    DB_USER: process.env.DB_USER,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DATABASE: process.env.DATABASE,

    SECRET_KEY: process.env.SECRET_KEY,
};
