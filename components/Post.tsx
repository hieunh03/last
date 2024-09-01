import React from "react";
import Router from "next/router";
import ReactMarkdown from "react-markdown";

export type PostProps = {
  id: string;
  title: string;
  user: {
    name: string;
    email: string;
  } | null;
  description: string;
};

const Post: React.FC<{ post: PostProps }> = ({ post }) => {
  const userName = post.user ? post.user.name : "Unknown user";
  return (
    // <div onClick={() => Router.push("/p/[id]", `/p/${post.id}`)}>
    <div>
      <h2>{post.title}</h2>
      <small>By {userName}</small>
      <ReactMarkdown children={post.description} />
      <style jsx>{`
        div {
          color: inherit;
          padding: 2rem;
        }
      `}</style>
    </div>
  );
};

export default Post;
