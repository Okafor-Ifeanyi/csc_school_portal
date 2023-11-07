import express from 'express'
const app = express();
const PORT = 5000

app.listen(PORT, async () => {
    console.log(`Running on PORT ${PORT}`);
    // await connect(DATABASE_URI)
})