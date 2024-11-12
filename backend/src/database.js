import mongoose from 'mongoose'


mongoose.connect('mongodb://localhost/parcialesdb')
        .then(db => console.log('base de dato conectado'))
        .catch(error => console.log(error)) 
        
////database.js