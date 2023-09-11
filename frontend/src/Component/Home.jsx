import React, { useEffect, useState } from 'react'
import axios from "axios"
import { toast } from "react-hot-toast"
import "./Home.css"
const Home = () => {
  const [name, setname] = useState({ name: "" })
  const [list, setList] = useState([])
  const [page, setPage] = useState(1);
  console.log(name, "from home >name< useState")

  const handleChange = (event) => {
    setname({ ...name, [event.target.name]: event.target.value })

  }
  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const everyevents = await axios.post('http://localhost:4000/allEvents', {
        page,
        name,
      });

      if (everyevents?.data?.success) {
        setList(everyevents?.data?.setevents);
        toast.success(everyevents.data.message);
      } else {
        toast.error(everyevents.data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const paging = async () => {
      try {
        const everyevents = await axios.post("http://localhost:4000/allEvents", { page, name })
        // console.log(everyevents, "everyevents")
        if (everyevents?.data?.success) {
          setList(everyevents?.data?.event)
          toast.success(everyevents.data.message)
        }
        toast.success(everyevents.data.message)

      } catch (error) {
        // toast.error(error.response.data.message)
        console.log(error)
      }
    }
    paging()
  }, [page, name])

  return (
    <div id="home-screen">
      <div id="home-top-bar">
        <div id="home-search">
          <form onSubmit={handleSubmit} >
            <input type='text' name="name" value={name.name} onChange={handleChange} />
            <input type='submit' value="search" />
          </form>
        </div>

      </div>
      <div id="middile-area-inside-home-srceen">
        {list?.length && list.map((pro) => (<div id="home-event-divs" key={pro._id}>
          <p>Event:- {pro.name}</p>
          <p>Creator:- {pro.creator.name}</p>
          <p>Date:- {pro.date}</p>
        </div>))}
      </div>
      <div id="home-bottom-bar">
        <div id='page-no-align-btn'>
          {page <= 1 ? <button disabled onClick={() => setPage((prev) => prev - 1)}>Prev</button> : <button onClick={() => setPage((prev) => prev - 1)}>Prev</button>}
          <span>{page}</span>
          {page === 2 ? <button disabled onClick={() => setPage((prev) => prev + 1)}>next</button> : <button onClick={() => setPage((prev) => prev + 1)}>next</button>}
        </div>
      </div>
    </div>
  )
}


export default Home
