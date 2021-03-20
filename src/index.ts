import express from 'express';
import morgan from 'morgan';
import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const app = express();

// Middlewares
app.use(morgan('dev'));
app.use(express.json());

const port = process.env.PORT || 3000;


// Create Users
app.post('/users', async (req: Request, res: Response) =>{
  const { user, email, phone } = req.body;
  try{
		const result = await prisma.myUser.create({
		  data:{
			 user,
			 email,
			 phone
		  } 
		})
		return res.json(result);
	 }catch(error){
		return res.status(500).json({ error: 'Something went wrong' })
	 }
})

// To show Users
app.get('/users', async (req: Request, res: Response) =>{
  try{
	 const allUser = await prisma.myUser.findMany();
	 return res.json(allUser);
  }catch(error){
	 return res.status(500).json({ error: 'Something went wrong' })
  }
})

// Update Users
app.put('/users/:id', async (req: Request, res: Response) =>{
  const { id } = req.params;
  const { user, email, phone } = req.body;
  try{
	 const updateUser = await prisma.myUser.update({
		where: {
		  id: Number(id)
		},
		data:{
		  user,
		  email,
		  phone
		}
	 })
	 return res.json(updateUser);
  }catch(error){
	 return res.status(500).json({ error: 'Something went wrong' })
  }
})

// Delete Users
app.delete('/users/:id', async (req: Request, res: Response) =>{
  const { id } = req.params;
  try{
	 const deleteUser = await prisma.myUser.delete({
		where: {
		  id: Number(id)
		}
	 })
	 return res.json(deleteUser);
  }catch(error){
	 return res.status(500).json({ error: 'Something went wrong' })
  }
})


app.listen(port, () =>{
  console.log(`Server on port:${port}`);
})

