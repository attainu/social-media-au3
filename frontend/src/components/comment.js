import React, { useState, useEffect } from "react";
const axios = require("axios");

function Comment({ i,username }) {
  const [cshow, setcshow] = useState(true);
  const [comment, setcomment] = useState("");
  const [com, setcom] = useState([]);
  // const [Id, setid] = useState();
  const sendComment = (e, id) => {
    e.preventDefault();
    console.log(comment);
    setcshow(!cshow);
    const dat = {
      author: username ,
      comment: comment
    };
    axios
      .post(`/post/comment/${id}`, dat)
      .then(res =>{axios
        .get(`/post/comments/${id}`)
        .then(res => res.data)
        .then(result => setcom(result.comment)); setcomment('')} )
      .catch(error => {
        console.log(error);
      });
    
    // handleClick()
  };
  const handleClick = id => {
    setcshow(!cshow);

    axios
      .get(`/post/comments/${id}`)
      .then(res => res.data)
      .then(result => setcom(result.comment));
  };
  // useEffect(()=>{
  //   axios
  //   .get(`/post/comments/${i.id}`)
  //   .then(res => res.data)
  //   .then(result => setcom(result.comment));
  // },[])
  return (
    <div className="container">
      {console.log(com)}
      
         {/* <i
          class="fa fa-comments"
          postid={i.id}
          onClick={() => handleClick(i.id)}
        ></i> */}
      {console.log("com",com)}
      <div className="d-flex align-items-center justify-content-center">  <input className="w-100 form-control my-2"
          placeholder="Enter your comment"
          value={comment}
          onChange={e => setcomment(e.target.value)}
          onKeyPress={e => (e.key === "Enter" ? sendComment(e, i.id) : null)}
        />
         <i
          class="fa fa-comments ml-3 text-info"
          postid={i.id}
          onClick={() => handleClick(i.id)}
        ></i> </div>
    { cshow?( com?com.map(i =>{console.log("com",i)
      return(i!==null)?
      (
            <div className="alert alert-secondary p-1">
              <p className="card-text">{i.author}: {i.comment}</p>
            </div>):null}
      ):null):null}
       
      
    </div>
  );
}
export default Comment;
