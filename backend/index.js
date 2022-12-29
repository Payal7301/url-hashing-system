const express=require('express');
const  dotenv = require("dotenv");
const  cors = require("cors");
const  mongoose = require("mongoose");
const  shortid = require("shortid");
const Url=require('./models/urlModel')
const utils=require('./util');

const {getAllShortUrls,addNewUrl,redirectOriginalUrl}=require('./controller/urlController');

const app=express();
dotenv.config();
app.use(cors());
app.use(express.json());

// db connnected
mongoose.connect(process.env.MONGO_URI,{
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
    console.log(`Db Connected`);
  }).catch((err) => {
    console.log(err.message);
  });


const urlAuth=express.Router();
const auth=require('./middleware/auth');

app.use('/',urlAuth);
app.use('/users',require('./controller/authController'));

// urlAuth.route('/all').get(getAllShortUrls);
// urlAuth.route('/short').post(addNewUrl);
// urlAuth.route('/:urlId').get(redirectOriginalUrl);

urlAuth.route('/all').get(auth,getAllShortUrls);
urlAuth.route('/short').post(auth,addNewUrl);
urlAuth.route('/:urlId').get(redirectOriginalUrl);

app.listen(3000,()=>{
console.log('app started on port 3000')
});


