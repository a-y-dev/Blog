const express = require('express');
const app = express();

app.get("/" , (req,res) => {
  let data = {
    id:1,
    title: "Blog title",
    description: "Blog description"
  }

  res.send(data);
});

const port = 5000;

app.listen(port, () => {
  console.log(`Sunucu ${port} numaralı portta başlatıldı`);
});