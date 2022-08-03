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

// app.use((req, res, next)=>{
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Cross-Origin-Resource-Policy', '*');
//     res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization, Cache-Control, sessionId');
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
//     next();
// })

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

app.use(helmet());

app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/post", authMidlewares.auth, postRoutes);

app.use('/images', express.static(path.join(__dirname, '/images')));

http.createServer(app).listen(3001);
