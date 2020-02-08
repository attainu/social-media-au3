import React, { useEffect, useState } from "react";
import Post from "./post";

function Home() {
  const [data, setdata] = useState([]);

  useEffect(() => {
    fetch(
      `https://newsapi.org/v2/top-headlines?sources=google-news&apiKey=f65ce9e8bef74ebebeee0b70fff82b1d`
    )
      .then(response => response.json())
      .then(json => setdata(json.articles));
  }, []);
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-2" style={{ background: "#B2B09B" }}>
          {console.log(data)}
        </div>
        <div className="col-md-5">
          <Post />
        </div>
        <div className="col-md-5">
          {data.map((i, ind) => (
            <div class="card mb-3 mt-3">
              <div class="card-header">{i.title}</div>
              <img src={i.urlToImage} alt="..." className="card-img-top" />
              <div class="card-body">
                {i.content} <a href={i.url}> read more...</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
export default Home;
