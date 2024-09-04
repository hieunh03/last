import handle, { extractVideoIdFromUrl, fetchYoutubeVideoData } from './index'; // Adjust path as necessary
import prisma from '../../../lib/prisma'; // Adjust path as necessary

jest.mock('../../../lib/prisma', () => ({
  videoPost: {
    create: jest.fn(),
  },
}));

const mockFetch = jest.fn();
global.fetch = mockFetch;

describe('extractVideoIdFromUrl', () => {
  it('should extract the video ID from a valid YouTube URL', () => {
    const url = 'https://www.youtube.com/watch?v=bkUmN9TH_hQ';
    const videoId = extractVideoIdFromUrl(url);
    expect(videoId).toBe('bkUmN9TH_hQ');
  });

  it('should return null for an invalid YouTube URL', () => {
    const url = 'https://www.example.com/watch?v=abc123xyz';
    const videoId = extractVideoIdFromUrl(url);
    expect(videoId).toBeNull();
  });
});

describe('fetchYoutubeVideoData', () => {
  const mockVideoData = {
    items: [
      {
        id: 'abc123xyz',
        snippet: {
          title: 'Test Video',
          description: 'Test Description',
        },
      },
    ],
  };

  beforeEach(() => {
    mockFetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockVideoData),
    } as any);
  });

  it('should fetch video data from YouTube API', async () => {
    const videoData = await fetchYoutubeVideoData('https://www.youtube.com/watch?v=bkUmN9TH_hQ');
    expect(videoData).toEqual(mockVideoData.items[0]);
  });

  it('should throw an error for invalid URL', async () => {
    await expect(fetchYoutubeVideoData('invalid-url')).rejects.toThrow('Invalid YouTube URL');
  });
});



describe('handle API', () => {
  const mockSession = {
    user: {
      name: 'Test User',
    },
  };

  beforeEach(() => {
    (prisma.videoPost.create as jest.Mock).mockClear();
  });

  it('should return an error for an invalid URL', async () => {
    const mockReq = {
      body: {
        url: 'invalid-url',
      },
    } as any;
    const mockRes = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    } as any;

    await handle(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.json).toHaveBeenCalledWith({ error: 'Invalid YouTube URL' });
  });
});

