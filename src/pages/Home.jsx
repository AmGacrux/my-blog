import { useEffect, useState } from 'react';
import { client } from '../libs/client';
import { Link } from 'react-router-dom';

export default function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    client.get({ endpoint: 'posts' }).then((res) => {
      setPosts(res.contents);
    });
  }, []);

  return (

    <div className="post-list">
      {posts.map((post) => (


        <article key={post.id} className="post-item">

        <div className="category-list">
  {post.categories && post.categories.map((cat) => (
    <span key={cat.id} className="category-tag">
      {cat.name}
    </span>
  ))}
</div>

          <Link to={`/post/${post.id}`}>
            <h2 className="post-title">{post.title}</h2>
            <p className="post-date">{new Date(post.publishedAt).toLocaleDateString()}</p>
          </Link>
        </article>
      ))}
    </div>
  );
}
