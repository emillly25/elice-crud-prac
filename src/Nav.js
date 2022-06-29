import { Link } from 'react-router-dom';

export function Nav(props) {
  const topics = props.data;
  return (
    <nav>
      <ol>
        {topics.map(el => <li key={el.id}><Link to={`/read/${el.id}`}>{el.title}</Link></li>)}
      </ol>
    </nav>
  );
}
