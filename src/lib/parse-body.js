export async function parseBody(req, res) {
  return new Promise((resolve) => {
    let data = "";
    req.on("data", (chunk) => {
      data += chunk;
    });
    req.on("end", () => {
      res.end();
      resolve(data);
    });
  });
}
