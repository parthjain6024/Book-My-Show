import mongoose, { connect } from "mongoose";
mongoose.set('strictQuery',false);

const connectToDatabase = async()=>{
    const {connection} = await  mongoose.connect(`mongodb+srv://parthjain11511:${process.env.DATABADE_PASSWORD}@cluster0.ir8bm.mongodb.net/test?retryWrites=true&w=majority&appName=Cluster0`)
    
    if(connect){
        console.log(`Connected to Database: ${connection.host}`)
    }   
};

export default connectToDatabase;


// `mongodb+srv://shravanddeshmukh:$BqiK6DG8qWjNCep@cluster0.azqksua.mongodb.net/bookmyshow?retryWrites=true&w=majority&appName=Cluster0`
