import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";

function MyVerticallyCenteredModal(props) {
  const [text, settext] = useState("");
  const [post, setpost] = useState([]);
  const handlePost = () => {
    setpost([text, ...post]);
    settext("");
    props.onHide();
  };
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      {console.log(post)}
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Create Posts
        </Modal.Title>
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

function Post() {
  const [modalShow, setModalShow] = React.useState(false);

  return (
    <>
      <Button
        variant="info"
        onClick={() => setModalShow(true)}
        className="mt-3"
      >
        Create Post
      </Button>

      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  );
}

export default Post;
