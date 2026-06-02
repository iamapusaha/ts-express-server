import express from "express";
const app = express();
const port = 5000;
app.get("/", (req, res) => {
  res.send(
    "yes,we are live! yes we are finally as always hello vai ki obesta, ki koren",
  );
});

app.listen(port, () => {
  console.log(`Our server live on port ${port}`);
});
