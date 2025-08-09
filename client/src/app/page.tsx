'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      const query = `
        query {
          posts {
            id
            title
            content
          }
        }
      `;

      try {
        const response = await axios.post(
          'http://localhost:4000/graphql',
          { query },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        setPosts(response.data.data.posts);
      }  catch (e) {
      console.error('Axios Error:', e);
      setError(e.message);
    } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) return <p>Loading posts...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Blog Posts</h1>
      {posts.map((post) => (
        <div key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.content}</p>
        </div>
      ))}
    </div>
  );
}
