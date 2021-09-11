require('dotenv').config();
const { json } = require('express');
const express = require('express');
const mongoose = require('mongoose');
const authRouter = require('./routers/auth');
const taskRouter = require('./routers/task');



const connectDB = async () => {
  try {
    await mongoose.connect(`mongodb+srv://${process.env.DB_USERMANE}:${process.env.DB_PASSWORD}@taskcluster.3fyhc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
      // {
      //   useCreateIndex: true,
      //   useNewUrlParser: true,
      //   useUnifiedTopology: true,
      //   useFindAndModify: true
      // }
    );
    console.log("connected database ");
  } catch (error) {
    console.log(error.message);
    //process.exit(1);
  }
}

connectDB();

// routers
const app = express();
app.use(express.json());

app.use('/api/auth',authRouter);
app.use('/api/task',taskRouter);


const PORT = 5000;
app.listen(PORT, () => console.log(`server running on port ${PORT}`));