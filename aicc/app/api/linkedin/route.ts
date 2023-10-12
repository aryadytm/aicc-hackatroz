import axios from 'axios';
import cheerio from 'cheerio';


import { type NextRequest } from 'next/server'


const username = process.env.USERNAME as string;
const password = process.env.PASSWORD as string;

export async function GET(request: NextRequest) {
  return Response.json({ result: "hi" })
}
