import express , {Request,Response, NextFunction}from 'express'
import cors from 'cors';
import path from 'path'
import 'express-async-errors';
import { router } from './routes';

const app = express();
app.use(cors())
app.use(express.json())
app.use(router)
app.use(
    '/files',
    express.static(path.resolve(__dirname,'..','tmp'))
)


app.use((err: Error,req:Request, res:Response,next: NextFunction)=>{
    // se for uma instancia de um error 
if(err instanceof Error){
    return res.status(400).json({
        error:err.message
    })
}

return res.status(500).json({
    status:'error',
    message:'Internal server error'
})

})

app.listen(3333,()=>{
    console.log("server is running")
})