import React, { useState } from "react";
import Layout from "../components/Layout";
import Router from "next/router";
import { toast } from "react-toastify";

const Draft: React.FC = () => {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const submitData = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const body = { url };
      const result = await fetch("/api/post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const result_json = await result.json();
      if (result.status !== 200) {
        toast.error(result_json.error || "An error occurred");
      } else {
        toast.success("Post created successfully");
        Router.push("/");
      }
    } catch (error) {
      toast.error("Internal Server Error");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div>
        <form onSubmit={submitData}>
          <h1>Youtube Video Sharing</h1>
          <input
            autoFocus
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Url"
            type="text"
            value={url}
          />
          <input
            disabled={loading}
            type="submit"
            value={loading ? "Loading..." : "Create"}
          />
          <a className="back" href="#" onClick={() => Router.push("/")}>
            Cancel
          </a>
        </form>
      </div>
      <style jsx>{`
        .page {
          background: var(--geist-background);
          padding: 3rem;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        input[type="text"],
        textarea {
          width: 100%;
          padding: 0.5rem;
          margin: 0.5rem 0;
          border-radius: 0.25rem;
          border: 0.125rem solid rgba(0, 0, 0, 0.2);
        }

        input[type="submit"] {
          background: #ececec;
          border: 0;
          padding: 1rem 2rem;
        }

        .back {
          margin-left: 1rem;
        }
      `}</style>
    </Layout>
  );
};

export default Draft;
