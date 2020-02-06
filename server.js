const express = require('express'); // web framework that handles multiple http requestes at a specific url
const mongoose = require('mongoose'); // connects the backend to the database
const cors = require('cors');
const bodyParser = require('body-parser'); // responsible for receiving requests from the frontend
const path = require('path'); // required for use in production mode

const app = express();

const server = require('./server-queries/queries');
server.applyMiddleware({app});

app.use(cors());
app.use(bodyParser.json());

// ROUTES
const adminRoute = require('./routes/administrators'); // sets the route for HTTP requests

app.use('/administrators', adminRoute);
//

if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'));
    app.get('*', (req,res) => {
        res.sendFile(path.resolve(__dirname, 'client','build','index.html'));
    });
}

const ATLAS_URI = require('./config/connection').mongoURI;
const uri = ATLAS_URI || 'mongodb://localhost:27017/capstone3_db';
// const uri = 'mongodb://localhost:27017/capstone3_db';
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
})
.then(() => console.log('MongoDB connected!'))
.catch((err) => console.log(err));

const port = process.env.PORT || 4000;
app.listen(port,(req,res) => {
    console.log(`🚀 Server ready at port: ${port}`);
});