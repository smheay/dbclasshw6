const { Client } = require("pg");
const express = require("express");
const app = express();
app.use(express.json());

let count = 0;

const client = new Client({
  user: "*********************",
  password: "*********************",
  host: "*********************",
  port: "*********************",
  database: "*********************",
});

app.get("/", (req, res) => res.sendFile(`${__dirname}/index.html`));

app.get("/agent", async (req, res) => {
  const rows = await readDb();
  res.setHeader("content-type", "application/json");
  res.send(JSON.stringify(rows));
});

app.get("/agent1", async (req, res) => {
  const rows = await readDb();
  res.setHeader("content-type", "application/json");
  res.send(JSON.stringify(rows));
});

//cheating to make it easier
app.post("/agent", async (req, res) => {
  let result = {};
  try {
    const reqJson = req.body;
    const rows = await readDb(reqJson.db);
    res.setHeader("content-type", "application/json");
    res.send(JSON.stringify(rows));
  } catch (e) {
    result.success = false;
  } finally {
   
  }
});

//cheating to make it easier
app.post("/agent1", async (req, res) => {
  let result = {};
  try {
    const reqJson = req.body;
    const rows = await readDb2(reqJson.db);
    res.setHeader("content-type", "application/json");
    res.send(JSON.stringify(rows));
  } catch (e) {
    result.success = false;
  } finally {
   
  }
});

app.listen(3000, () => console.log("Web server is listening.. on port 3000"));

start();

async function start() {
  await connect();
}

async function connect() {
  try {
    await client.connect();
  } catch (e) {
    console.error(`Failed to connect ${e}`);
  }
}

async function readDb(dp) {
  try {
    count++;
    console.log(`${dp} ${count}`);
    const results = await client.query(dp);
    return results.rows;
  } catch (e) {
    return [];
  }
}

async function readDb2(dp) { //dp ==db 
  try {
    count++;
    console.log(`${dp} ${count}`);

    dp = dp.replace(/^([^0-9\.]+/g, "");
    dp = dp.replace(/[--]+/g, "");
    

    console.log(`${dp} ${count}   removed comment ` );
    const results = await client.query(dp);
    return results.rows;
  } catch (e) {
    return [];
  }
}


