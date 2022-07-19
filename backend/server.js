const   http = require("http"),
        express = require("express"),
        app = express(),
        cors = require('cors'),

        helmet = require('helmet'),
        path = require('path'),
        dotenv = require('dotenv'),
        cookieParser = require('cookie-parser'),
        
        authRoutes = require('./routes/authRoutes'),
        userRoutes = require('./routes/userRoutes'),
        postRoutes = require('./routes/postRoutes'),
        
        authMidlewares  = require('./midlewares/auth');

dotenv.config({path:"./config/.env"});

app.use(helmet());

app.use(cookieParser())

const corsOptions = {
    origin : 'http://localhost:3000',
    optionsSuccessStatus: 200,
    credentials : true,
    allowedHeaders : ['sessionId','content-type', 'Authorization', 'Cache-Control'],
    exposedHeaders : ['sessionId'],
    methods : 'GET, HEAD, POST, PUT, DELETE, PATCH, OPTIONS',
    preflightContinue : false
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/post", authMidlewares.auth, postRoutes);

app.use("/image", express.static(path.join(__dirname, '/images')));

http.createServer(app).listen(3001);
