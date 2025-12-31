import { useEffect, useState } from 'react';
import { client } from './libs/client';
import ReactMarkdown from 'react-markdown';

function App() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    client.get({ endpoint: 'posts' }).then((res) => {
      setPosts(res.contents);
    });
  }, []);

  return (
    <div>
      <h1>My Blog</h1>
      {posts.map((post) => (
        <article key={post.id} style={{ borderBottom: '1px solid #ccc', marginBottom: '2rem' }}>
          <h2>{post.title}</h2>
          {/* MarkdownをHTMLに変換して表示 */}
          <ReactMarkdown>{post.content}</ReactMarkdown>
        </article>
      ))}
    </div>
  );
}

export default App;
