import express from 'express'
import mongoose from 'mongoose'
import morgan from 'morgan'
import cors from 'cors'

import config from './config'
import apiRoutes from './routes/index.routes'

class Server {
    public app;

    constructor() {
        this.app = express();
        this.configure();
        this.routes(); 
    }

    configure() {
        // Database
        const DATABASE = 'mongodb://localhost/video-collections-ts-react';
        mongoose.set('useFindAndModify', true);
        mongoose.connect(process.env.MONGODB_URL || DATABASE, {
            useNewUrlParser: true,
            useCreateIndex: true
        }).then(db => console.log("Database connected!"))
        .catch(db => console.error("Error connecting to Database"));
        //Port
        this.app.set('port', config.PORT);
        //Middlewares
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: false}));
        this.app.use(morgan('dev'));
        this.app.use(cors())
    }

    routes() {
        this.app.use(apiRoutes);
    }

    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log('Server listening on port', this.app.get('port'));
        })
    }
}

const server = new Server();
server.start();