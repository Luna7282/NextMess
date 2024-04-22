import mongoose from "mongoose"

type ConnectionObject = {
    isConnected ?: number
}

const connection : ConnectionObject={}

async function dbconnect(): Promise<void>{
    if (connection.isConnected) {
        console.log(" Database is already connected")
        return
    }

    try  {
       const db= await mongoose.connect(process.env.MONGO_URI ||'')

    connection.isConnected =db.connections[0].readyState
    console.log(db);   // also db.connections clg
    console.log("DB connection successful")
    } catch (error) {
        
        console.log("DB connection Failed !!!! ",error)
        process.exit(1)
    }
}
export default dbconnect