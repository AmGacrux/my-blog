import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { client } from '../libs/client';

function Sidebar() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // カテゴリAPIを作成している場合
    client.get({ endpoint: 'categories' }).then((res) => setCategories(res.contents));
  }, []);

  return (
    <aside className="sidebar">
      <h3>Categories</h3>
      <ul>
        {categories.map((cat) => (
          <li key={cat.id}>
          <Link to={`/category/${cat.id}`}>{cat.name}</Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
export default Sidebar;
