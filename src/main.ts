import express, { Application } from 'express';
import path from 'path';
import dotenv from "dotenv";
import Controllers from "./controllers";

dotenv.config();

const PUBLIC_URL: string = process.env.PUBLIC_URL || '';
const PORT: string = process.env.API_PORT || '3000';
const isProduction : boolean = process.env.ENV != "development";

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/api/test", (_, response) =>{
  response.json({test: Date.now()});
});

Controllers.forEach(controller => {
  const t = new controller;
  t.Map(app)
});

if(isProduction){
  app.use(
    PUBLIC_URL,
    express.static(path.resolve(__dirname, 'www'), { maxAge: Infinity })
  );

  app.get('*', (_, res) => {
    res.sendFile(path.resolve(__dirname, './www/index.html'));
  });
}

app.listen(PORT, () => {
  console.log(
    '\x1b[34m',
    `${String.fromCodePoint(
      0x1f680
    )} Server has started running at http://localhost:${PORT}/ ${String.fromCodePoint(
      0x1f680
    )}`
  );
  const mode = isProduction ? "Production" : "Development";
  console.log("Started in "+ mode + " Mode");
});

module.exports = app;
