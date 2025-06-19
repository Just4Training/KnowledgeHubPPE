import express, { Request, Response, NextFunction } from 'express';
import { MongoClient, Db, Collection, Document } from 'mongodb';

const router = express.Router();

const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);
const dbName = 'mydb';

let db: Db;
let collection: Collection<Document>;

let isConnected = false;

async function initDb() {
    if(!isConnected) {
          await client.connect();
          db = client.db(dbName);
          collection = db.collection('test');
          isConnected = true;
          console.log('MongoDB connected');
    }
}

/* GET home page. */
router.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        await initDb();
        const docs = await collection.find({}).toArray();
        res.render('index', { title: 'HomePage for Bobby', condition: true, myList: docs });
    } catch (err) {
        next(err);
    }
});

// router.get('/algorithm', function(req: Request, res, next) {
//   res.send('respond with a resource');
// });

/* POST Database API*/
router.post('/insert', async(req: Request, res: Response, next: NextFunction) => {
    try {
        await initDb();
        const item = {
            title: req.body.title,
            content: req.body.content,
            author: req.body.author
        };
        const result = await collection.insertOne(item);
        console.log('Inserted =>', result.insertedId);
        res.redirect('/');
    } catch (err) {
        next(err);  
    }
});

export default router;
