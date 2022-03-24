const express = require('express');
const app = express();

const client = require('./redis-client');

app.get('/', (req, res) => {

  try {
    return res.send('Hello world');
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

app.get('/placeorder/:bookname', async (req, res) => {
  try {
    const { key } = req.params.bookname;
    const value = req.query;
    await client.setAsync(key, JSON.stringify(value));
    return res.send('Success');
  }catch (err) {
    res.status(500).send({ error: err.message });
  }
});


app.get('/:bookname', async (req, res) => {
  try {
    const { key } = req.params.bookname;
    const rawData = await client.getAsync(key);
    return res.json(JSON.parse(rawData));
  }catch (err) {
    res.status(500).send({ error: err.message });
  }
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});