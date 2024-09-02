import { getSession } from 'next-auth/react';
import prisma from '../../../lib/prisma';
import { getServerSession } from 'next-auth';
import { options } from '../auth/[...nextauth]';

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY; // Make sure to set this in your environment variables

async function fetchYoutubeVideoData(url: string) {
  const videoId = extractVideoIdFromUrl(url);
  if (!videoId) {
    throw new Error('Invalid YouTube URL');
  }
  console.log('test')

  const response = await fetch(
    `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&part=snippet,contentDetails,statistics&key=${YOUTUBE_API_KEY}`, {
      method: 'GET',
       headers: {
         'Content-Type': 'application/json',
       },
    }
  )
  console.log(response)
  const data = await response.json();
  console.log(data)
  if (data.items.length === 0) {
    throw new Error('Video not found');
  }
  return data.items[0];
}

function extractVideoIdFromUrl(url: string): string | null {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
}

// POST /api/post
export default async function handle(req, res) {
  const { url } = req.body;
  console.log(url)
  const videoData = await fetchYoutubeVideoData(url);
  const session = await getServerSession(req,res, options);
  console.log(session)
  const result = await prisma.videoPost.create({
    data: {
      videoId: url,
      title: videoData.snippet.title,
      description: videoData.snippet.description,
      thumbnailUrl: videoData.snippet.thumbnails.high.url,
      authorName: session.user.name,
    },
  });
  res.json(result);
}
