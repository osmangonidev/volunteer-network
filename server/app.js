const expressSetup=require('express-setup'); // This is my own package.It simplifies the basic setup.
const MongoClient = require('mongodb').MongoClient;
const objectId = require('mongodb').ObjectId;
const app=expressSetup.setup(5000)

app.get('/',(req,res)=>{
    res.send('<h1>Hello World</h1>')
})

const uri = "mongodb+srv://mongodbuser:mongodbpassword@cluster0.koqo3.mongodb.net/volunteer-network?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true});
client.connect(err => {
  const allTasksCollection = client.db("volunteer-network").collection("alltasks");
  const allRegistriedTasksCollection = client.db("volunteer-network").collection("all-registried-tasks");

  app.get('/tasks',(req,res)=>{
    allTasksCollection.find({})
      .toArray((err,documents)=>{
        res.send(documents)
      })
  })
  app.get('/allTasks', (req,res)=>{
    allTasksCollection.find({})
    .toArray((error, documents)=>{
      console.log('documents',documents)
      res.send(documents)
    })
  })

  app.get('/all-registered-events',(req,res)=>{
    allRegistriedTasksCollection.find({})
    .toArray((error,documents)=>{
      res.send(documents)
      
    })
  })

  app.get('/my-events',(req,res)=>{
    allRegistriedTasksCollection.find({email:req.headers.email})
    .toArray((error,documents)=>{
      res.send(documents)
      
    })
  })

    app.post('/taskRegister',(req,res)=>{
      allRegistriedTasksCollection.insertOne(req.body)
      .then(result=>{
        
        res.send(result.insertedCount>0)
      })
    })

    app.post('/add-event',(req,res)=>{
      allTasksCollection.insertOne(req.body)
      .then(result=>{
        res.send(result.insertedCount>0)
      })
    })


    app.delete('/cancel-event',(req,res)=>{
      allRegistriedTasksCollection.deleteOne({_id:objectId(req.headers.id)})
      .then(result=>{
        res.send(result.deletedCount>0)
      })
    })

    app.delete('/delete-event',(req,res)=>{
      allRegistriedTasksCollection.deleteOne({_id:ObjectID(req.headers.id)})
      .then(result=>{
        
        res.send(result.deletedCount>0)
      })
    })


  
});
