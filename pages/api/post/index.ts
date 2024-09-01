import { getSession } from 'next-auth/react';
import prisma from '../../../lib/prisma';
import { getServerSession } from 'next-auth';
import { options } from '../auth/[...nextauth]';

// POST /api/post
export default async function handle(req, res) {
  const { url } = req.body;
  console.log(url)
  const session = await getServerSession(req,res, options);
  console.log(session)
  const result = await prisma.videoPost.create({
    data: {
      url: url,
      title: "test",
    },
  });
  res.json(result);
}