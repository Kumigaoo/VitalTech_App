const CHUNK_PUBLIC_PATH = "server/pages/_app.js";
const runtime = require("../chunks/ssr/[turbopack]_runtime.js");
runtime.loadChunk("server/chunks/ssr/[root of the server]__8cc430._.js");
runtime.loadChunk("server/chunks/ssr/src_styles_b41516.css");
module.exports = runtime.getOrInstantiateRuntimeModule("[project]/pages/_app.jsx [ssr] (ecmascript)", CHUNK_PUBLIC_PATH).exports;
