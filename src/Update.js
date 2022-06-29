import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

export function Update(props) {
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

  function submitHandler(e) {
    e.preventDefault();
    const title = e.target.title.value;
    const body = e.target.body.value;
    props.onUpdate(id, title, body);
  }
  return (
    <article>
      <h1>Update</h1>
      <form onSubmit={submitHandler}>
        <p><input type='text' name='title' placeholder='title' value={topic.title} onChange={(e) => {
          setTopic(cur => {
            const newTopic = { ...cur, title: e.target.value };
            return newTopic;
          });
        }}></input></p>
        <p><textarea name='body' placeholder='body' value={topic.body} onChange={(e) => {
          setTopic(cur => {
            const newTopic = { ...cur, body: e.target.value };
            return newTopic;
          });
        }}></textarea></p>
        <p><input type='submit' value='update'></input></p>
      </form>
    </article>
  );
}
