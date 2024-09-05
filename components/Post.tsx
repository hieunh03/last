import React from "react";
import Router from "next/router";
import ReactMarkdown from "react-markdown";

export type PostProps = {
  id: string;
  videoId: string;
  title: string;
  description: string;
  authorName: string;
};

const Post: React.FC<{ post: PostProps }> = ({ post }) => {
  return (
    <div className="video-post">
      <iframe
        className="video-frame"
        width="560"
        height="315"
        src={`https://www.youtube.com/embed/${post.videoId}`}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
      <div className="post-content">
        <h2 className="movie-title">{post.title}</h2>
        <small className="shared-by">Shared by: {post.authorName}</small>
        <div className="description">
          <span>Description: </span>
          <ReactMarkdown children={post.description} />
        </div>
      </div>
      <style jsx>{`
        .video-post {
          display: flex;
          flex-direction: row;
          padding: 10px;
          max-width: 800px;
          margin: 20px auto;
        }
        .video-frame {
          flex-shrink: 0;
          width: 300px;
          height: 200px;
          margin-right: 20px;
        }
        .post-content {
          flex-grow: 1;
          display: flex;
          flex-direction: column;
        }
        .movie-title {
          color: red;
          font-size: 20px;
          margin-bottom: 5px;
        }
        .shared-by {
          font-size: 14px;
          color: #555;
          margin-bottom: 10px;
        }
        .description {
          font-size: 14px;
          color: #333;
        }

        @media (max-width: 600px) {
          .video-post {
            flex-direction: column;
            align-items: center;
          }
          .video-frame {
            width: 100%;
            height: auto;
            margin-right: 0;
          }
          .post-content {
            width: 100%;
            margin-top: 10px;
          }
          .movie-title {
            font-size: 18px;
          }
          .shared-by,
          .description {
            font-size: 12px;
          }
        }
      `}</style>
    </div>
  );
};

export default Post;
