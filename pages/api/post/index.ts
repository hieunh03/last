import prisma from '../../../lib/prisma';
import { getServerSession } from 'next-auth';
import { options } from '../auth/[...nextauth]';
import { errorMonitor } from 'events';

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY; // Make sure to set this in your environment variables

export async function fetchYoutubeVideoData(url: string) {
  const videoId = extractVideoIdFromUrl(url);
  if (!videoId) {
    throw new Error('Invalid YouTube URL');
  }
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

export function extractVideoIdFromUrl(url: string): string | null {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
}

// POST /api/post
export default async function handle(req, res) {
  try {
    const { url } = req.body;
    const videoData = await fetchYoutubeVideoData(url);
    const session = await getServerSession(req, res, options);
    const result = await prisma.videoPost.create({
      data: {
        videoId: videoData.id,
        title: videoData.snippet.title,
        description: videoData.snippet.description,
        authorName: session.user.name,
      },
    });
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: error.message || 'An unxpected error occured' });
  }
}