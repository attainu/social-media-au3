import React, { useState, useEffect } from "react"
import { Modal, Button } from "react-bootstrap"

import Dislike from "./dislike"
import Like from "./like"
import Comment from "./comment"

const axios = require("axios")

function MyVerticallyCenteredModal(props) {

    const [text, settext] = useState("");
    const [post, setpost] = useState([]);
    
    const handlePost = () => {
        settext("");
        props.onHide();
        const data = {
        author:props.username,
        posts: text,
        like: 0
        };
        axios
        .post("/post/posts", data)
        .then(res => props.setflag(!props.flag))
        .catch(error => {
            console.log(error);
        });
        
    };
    return (
        <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        >
        <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">Create Posts</Modal.Title>
        </Modal.Header>
        <input
            className="card-body"
            value={text}
            placeholder="Write Something here..."
            style={{ border: "none" }}
            col="80"
            onChange={e => settext(e.target.value)}
        />
        <Modal.Footer>
            <Button onClick={() => handlePost()}>Post</Button>
        </Modal.Footer>
        </Modal>
    );
}

function Post({ username }) {
    const [modalShow, setModalShow] = React.useState(false);
    const [posts, setposts] = useState([]);
    const [flag, setflag] = useState(true);

    useEffect(() => {
        axios
            .get("/post/posts")
            .then(res => res.data)
            .then(result => setposts(result));
    }, [flag]);

    return (
        <div>
            <Button variant="info" onClick={() => setModalShow(true)} className="mt-3">Create Post</Button>

            <MyVerticallyCenteredModal
                show={modalShow}
                onHide={() => setModalShow(false)}
                setflag={setflag}
                flag={flag}
                username={ username }
            />
            {
                posts.length > 0 ? posts.map((i, ind) => (
                    <div className="card bg-light p-2 mb-3 mt-3" key={ind} style={{maxWidth: "18rem;"}}>
                        <div className="card-header">{i.author}</div>
                        <div className="card-body">
                            <p className="card-text">{i.posts}</p>
                        </div>
                        <div className="card-footer bg-transparent">
                            <div className="row">
                                <div className="col-2 d-flex justify-content-center align-items-center">
                                    {(i.like && (
                                    i.like.indexOf(
                                        username 
                                    ) >= 0
                                    )              
                                    ) ? (
                                    <Dislike postid={i.id} setflag={setflag} flag={flag} username={ username }/>
                                    ) : (
                                    <Like postid={i.id} setflag={setflag} flag={flag} username={ username } />
                                    )}
                                </div>
                                <div className="col-10">
                                    <Comment i={i} username={ username }/>
                                </div>
                            </div>
                        </div>
                    </div>
                )) : null
            }
        </div>
    );
}

export default Post;