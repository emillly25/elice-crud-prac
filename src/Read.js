import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

export function Read() {
  const params = useParams();
  const id = Number(params.id);
  const [topic, setTopic] = useState({ title: null, body: null });
  async function refresh() {
    const res = await fetch('/topics/' + id);
    const data = await res.json();
    setTopic(data);
  }

  useEffect(() => {
    refresh();
  }, [id]);

  return (
    <article>
      <h2>{topic.title}</h2>
      {topic.body}
    </article>
  );
}
