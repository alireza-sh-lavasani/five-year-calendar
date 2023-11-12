// lib/mongodb.ts
import { MongoClient } from 'mongodb'

const uri: string = process.env.MONGODB_URI!
export const mongodbClient = new MongoClient(uri)
