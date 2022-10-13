/**
 * Server Side Rendering
 */
import * as React from "react";
import { renderToString } from "react-dom/server";

import App from "../src/App";
import html from "./html";
import config from "./config";

/**
 * Server-side rendering
 */
export default async function render(_event) {
    const stats = (await import("../dist/stats.json"));
    const content = renderToString(
        <App />
    );
    return html({ stats, content, config });
}