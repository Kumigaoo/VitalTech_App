self.__BUILD_MANIFEST = {
  "polyfillFiles": [
    "static/chunks/polyfills.js"
  ],
  "devFiles": [
    "static/chunks/react-refresh.js"
  ],
  "ampDevFiles": [],
  "lowPriorityFiles": [],
  "rootMainFiles": [],
  "rootMainFilesTree": {},
  "pages": {
    "/": [
      "static/chunks/webpack.js",
      "static/chunks/main.js",
      "static/chunks/pages/index.js"
    ],
    "/_app": [
      "static/chunks/webpack.js",
      "static/chunks/main.js",
      "static/chunks/pages/_app.js"
    ],
    "/_error": [
      "static/chunks/webpack.js",
      "static/chunks/main.js",
      "static/chunks/pages/_error.js"
    ],
    "/agenda": [
      "static/chunks/webpack.js",
      "static/chunks/main.js",
      "static/chunks/pages/agenda.js"
    ],
    "/citas": [
      "static/chunks/webpack.js",
      "static/chunks/main.js",
      "static/chunks/pages/citas.js"
    ],
    "/diagnosticos": [
      "static/chunks/webpack.js",
      "static/chunks/main.js",
      "static/chunks/pages/diagnosticos.js"
    ],
    "/main": [
      "static/chunks/webpack.js",
      "static/chunks/main.js",
      "static/chunks/pages/main.js"
    ],
    "/medicacion": [
      "static/chunks/webpack.js",
      "static/chunks/main.js",
      "static/chunks/pages/medicacion.js"
    ],
    "/pacientes": [
      "static/chunks/webpack.js",
      "static/chunks/main.js",
      "static/chunks/pages/pacientes.js"
    ]
  },
  "ampFirstPages": []
};
self.__BUILD_MANIFEST.lowPriorityFiles = [
"/static/" + process.env.__NEXT_BUILD_ID + "/_buildManifest.js",
,"/static/" + process.env.__NEXT_BUILD_ID + "/_ssgManifest.js",

];