import express from 'express'
import nodeRouter from './routes/nodeRoutes'
import edgeRouter from './routes/edgeRoutes'
const app = express()
const port = 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use("/nodes", nodeRouter)
app.use("/edges", edgeRouter);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})