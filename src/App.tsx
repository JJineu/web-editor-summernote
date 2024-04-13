/* eslint-disable */
import React, { useEffect, useState } from 'react';
import ReactSummernote from './ReactSummernote.jsx';

const App = () => {
  const [content, setContent] = useState('');
  const summernote = React.useRef(null);

  return (
    <div>
      <div
        style={{ height: 500, border: '1px solid #000'}}
        dangerouslySetInnerHTML={{ __html: content }}
      ></div>
      <h1>게시판</h1>
      <ReactSummernote editor={summernote} />
      <button onClick={() => setContent(summernote.current.value)}>저장</button>
    </div>
  );
};

export default App;
