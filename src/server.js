import http from "http";
import path from "path";

import mri from "mri";
import { parseBody } from "./lib/parse-body";
import { updateCSS } from "./lib/update-css";
import { REQUEST, createRouter } from "./lib/router";

const DEFAULT_PORT = 5000;

const writeError = (text) => {
  console.error("\x1b[41m " + text + " \x1b[0m");
};

const bold = (text) => {
  return `\x1b[36m\x1b[1m` + text + `\x1b[0m`;
};

let router = createRouter();

function cli() {
  const server = http.createServer((req, res) => {
    router.set(req, res);
  });
  const { port } = parseArgs();
  const _port = port || DEFAULT_PORT;
  server.listen(_port, () => {
    console.log(bold(`> Listening on ${_port}`));
  });
}

function parseArgs() {
  const argv = process.argv.slice(2);
  const flags = mri(argv, {
    alias: {
      p: "port",
    },
  });

  const validFlags = ["_", "p", "port"];

  Object.keys(flags).forEach((item) => {
    if (validFlags.indexOf(item) < 0) {
      printUsage();
      writeError(`Unaccepted flag: ${item}`);
      process.exit(1);
    }
  });

  return flags;
}

function printUsage() {
  console.log(`
  $ stone-cli [flags]

    > flags
     -p --port Change the port the server run's on (default: ${DEFAULT_PORT}) 
  `);
}

router.listener.on(REQUEST, () => {
  router.get("/", statusResponse);

  router.post("/css", async (req, res) => {
    const body = await parseBody(req, res);
    const data = JSON.parse(body);
    const filePath = path.resolve(data.options.output);
    updateCSS({ path: filePath, css: data.css });
  });
});

function statusResponse(req, res) {
  res.setHeader("content-type", "application/json");
  return res.end(
    JSON.stringify(
      {
        cli: "running",
      },
      null,
      2
    )
  );
}

cli();
