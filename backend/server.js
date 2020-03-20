import express from 'express'
import cors from 'cors'
import { Server } from 'http'
import tempData from './tempData'
require('dotenv').config()


const app = express();
const port = process.env.PORT || 8080;

var server = Server(app);

app.use(cors());
app.use(express.json());


const getTempData = async (req, res) => {
  res.json(tempData)
}


app.get('/getData', getTempData)


server.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});