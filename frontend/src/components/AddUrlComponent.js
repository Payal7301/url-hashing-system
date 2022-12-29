import React, { useState } from 'react'
import axios from "axios";
import UrlInfo from './UrlInfo';

const AddUrlComponent = () => {
    const [url, setUrl] = useState("");
    const [newUrl,setnewUrl]=useState("");
    const [cnt,setcnt]=useState("");
    const[isfilled,setisfilled]=useState(false);

    const onSubmit = (e)=> {
        e.preventDefault();

        if (!url) {
          alert("please enter something");
          return;
        }
        const headers={
          'Content-Type': 'application/json',
            "x-auth-token":localStorage.getItem("auth-token")
        }
        axios
          .post("http://localhost:3000/short", {origUrl: url},{headers:headers})
          .then(res => {
            setisfilled(true)
            console.log(res.data)
            console.log(res.data.shortUrl);
            setnewUrl(res.data.shortUrl)
            setcnt(res.data.clicks.toString())
          })
          .catch(err => {
            console.log(err.message);
          });
        setUrl("")
    }
    console.log(url)

  return (
    <div>
      <main>
        <section className="w-100 d-flex flex-column justify-content-center align-items-center">
          <h1 className="mb-2 ">URL Hashing System</h1>
          <form className="w-50" onSubmit={onSubmit}>
            <input
              className="w-100 border border-primary p-2 mb-2 fs-3 h-10"
              type="text"
              placeholder="Enter your url"
              value={url}
              onChange={e => setUrl(e.target.value)}
            />
            <div class="d-grid gap-2 col-6 mx-auto">
            <button type="submit" className="btn btn-danger m-5">
              Shorten!
            </button>
            </div>
          </form>
             {isfilled&&<UrlInfo newUrl={newUrl} cnt={cnt}/>}
        </section>
      </main>
    </div>
  );
}

export default AddUrlComponent;