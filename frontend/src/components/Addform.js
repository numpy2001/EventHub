import React, { useState, useEffect,useRef } from 'react';
import '../design/Addform.css';

const Addform = () => {
  const [venueList, setVenueList] = useState([]);
  const [eventData, setEventData] = useState({
    title: '',
    description: '',
    date: '',
    locationId: ''
  });

  const handleChange = (e) => {
    setEventData({ ...eventData, [e.target.name]: e.target.value });
  };

  const imageRef=useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data=new FormData();
    data.append("title",eventData.title);
    data.append("description",eventData.description);
    data.append("date",eventData.date);
    data.append("locationId",eventData.locationId);
    data.append("imageDetails",imageRef.current.files[0]);
    
    //const data={...eventData,imageDetails:imageRef.current.files[0],authorId:"6616cb4f2b543fd062acffab"}
    // Do something with the form data, like sending it to a server 
    await fetch("http://localhost:5000/api/events/createEvent", {
      method: "POST",
      
      body: data,
    })
  };

  useEffect(() => {
    const fetchVenue = async () => {
      const res = await fetch("http://localhost:5000/api/location/getlocation");
      const data = await res.json();
      console.log(data);
      setVenueList(data);
    }
    fetchVenue();
  }, [])


  return (
    <form className="form" onSubmit={handleSubmit}>
      <label htmlFor="eventName">Name of Event:</label>
      <input
        type="text"
        id="eventName"
        name="title"
        value={eventData.title}
        onChange={handleChange}
        required
      />

      <label htmlFor="description">Description:</label>
      <textarea
        id="description"
        name="description"
        value={eventData.description}
        onChange={handleChange}
        required
      ></textarea>

      <label htmlFor="dateTime">Date/Time:</label>
      <input
        type="datetime-local"
        id="dateTime"
        name="date"
        value={eventData.date}
        onChange={handleChange}
        required
      />

      <label htmlFor="venue">Venue:</label>
      <select
        id="venue"
        name="locationId"
        value={eventData.locationId}
        onChange={handleChange}
        required
      >
        <option value="">Select Venue</option>
        {venueList.map((option) => (
          <option key={option._id} value={option._id}>
            {option.location}
          </option>
        ))}
      </select>
      <label>Select Image:</label>
      <input type="file" ref={imageRef}></input>

      <button type="submit">Submit</button>
    </form>
  );
};

export default Addform;  