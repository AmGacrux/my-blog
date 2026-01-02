import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { client } from '../libs/client';

export default function CategoryHome() {
  const { categoryId } = useParams();
  const [posts, setPosts] = useState([]);
  const [categoryName, setCategoryName] = useState("");

  useEffect(() => {
    client.get({
      endpoint: 'posts',
      queries: { filters: `categorys[contains]${categoryId}` } // カテゴリで絞り込み
    }).then((res) => {
      setPosts(res.contents);
    });

    // カテゴリ名自体も取得（画面表示用）
    client.get({ endpoint: 'categories', contentId: categoryId }).then((res) => {
      setCategoryName(res.name);
    });
  }, [categoryId]);

  return (
    <div>
      <h2>Category: {categoryName}</h2>
      <div className="post-list">
        {posts.length === 0 && <p>記事がありません。</p>}
        {posts.map((post) => (
          <article key={post.id} className="post-item">
            <Link to={`/post/${post.id}`}>
              <h3 className="post-title">{post.title}</h3>
              <p className="post-date">{new Date(post.publishedAt).toLocaleDateString()}</p>
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
