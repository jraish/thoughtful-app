import manifest from "../public/manifest.json";

const isLocal = process.env.IS_LOCAL || process.env.IS_OFFLINE;

const config = {
    app: {
        TITLE: manifest.short_name,
        THEME_COLOR: manifest.theme_color,
        URL: isLocal ? `http://localhost:3000` : String(process.env.APIGATEWAY_URL),
        DIST_URL: isLocal ? "http://localhost:8080" : String(process.env.APP_DIST_URL),
        PUBLIC_URL: isLocal ? "http://localhost:8080" : String(process.env.APP_PUBLIC_URL),
    },
};

export default config;