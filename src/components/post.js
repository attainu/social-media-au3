import React, { useState } from "react";
import "./post.css";
function Post() {
  const [show, setshow] = useState(false);
  const [text, settext] = useState("");
  const [post, setpost] = useState([]);
  const handlePost = () => {
    setpost([text, ...post]);
    settext("");
    setshow(false);
  };
  {
    console.log(post);
  }
  return (
    <div class="card text-white bg-secondary mb-3 mt-3" id="head">
      <div class="card-header text-left" onClick={() => setshow(!show)}>
        Create Post
      </div>
      {show ? (
        <div className="card">
          <textarea
            className="card-body"
            value={text}
            placeholder="Write Something here..."
            style={{ border: "none" }}
            onChange={e => settext(e.target.value)}
          ></textarea>
          <button className="btn btn-primary" onClick={handlePost}>
            Post
          </button>
        </div>
      ) : (
        <p className="card-text"></p>
      )}
    </div>
  );
}
export default Post;
