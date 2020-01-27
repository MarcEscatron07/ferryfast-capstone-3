# SETTING UP A MERNG PROJECT

1. Enter the following npm terminal commands:
    - npm init -y
    - npm install express
    - npm install mongoose
    - npm install nodemon or npm install nodemon -g (for global installation)
    - npm install concurrently -g
    - nodemon fileName.js
    - npm install graphql express-graphql
    - npm install graphql-iso-date

2. Create file for GraphQL Schema. Suggested name is 'gql-schema'. Then, 
    set up 'express','express-graphql','gql-schema' and use for connection.

    const express = require('express');
    const app = express();

    const graphqlHTTP = require('express-graphql');
    const graphQLSchema = require('./graphql-schema');

    app.use('/graphql', graphqlHTTP({schema:graphQLSchema, graphiql:true}))
    const port = 3000;
    app.listen(port,(req,res) => {
        console.log('Connected at port: '+port);
        console.log('Launch GraphiQL at: localhost:'+port+'/graphql');
    });

3. Set up mongoose to allow communication between Node.js and MongoDB.
    //insert before 'const graphqlHTTP'
    const mongoose = require('mongoose');

    //insert after 'const graphQLSchema'
    mongoose.connect('mongodb://localhost:27017/name_of_db',{useNewUrlParser:true});
    mongoose.connection.once('open', () => {
        console.log('Now connected to local MongoDB server!');
    });

4. Create folder for the data models. Suggested name for the directory is 'models'.
5. Go to the 'models' directory and inside the 'nameOfModel.js', enter the ff. codes:
    const mongoose = require('mongoose');
    const Schema = mongoose.Schema
    const modelNameSchema = new Schema(
        {
            fieldName: {
                type: String,
                required: true,
                trim: true
            }
        }, 
        {
            timestamps: true
        }
    );

    module.exports = mongoose.model('User', modelNameSchema);

*. Enter the following terminal commands for React:
    - npm init react-app projectname-react-app OR 
        npm install create-react-app -g (for global installation) -> create-react-app sample-react-app
    - npm start

DOCUMENTATIONS:
1. MongoDB      =   https://docs.mongodb.com/manual/tutorial/getting-started/
2. Mongoose     =   https://mongoosejs.com/docs/
3. GraphQL      =   https://graphql.org/learn/
4. React        =   https://reactjs.org/docs/getting-started.html

NOTE: If 'npm run dev' fails due to this error: 
[nodemon] Internal watch failed: ENOSPC: System limit for number of file watchers reached

-> enter the either of the ff. code to the terminal(must have access to 'sudo'):
1.) Permanent change: 
echo fs.inotify.max_user_watches=582222 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p

2.) Temporary change (disappears after reboot):
sudo sysctl fs.inotify.max_user_watches=582222 && sudo sysctl -p