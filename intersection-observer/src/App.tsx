import { useState, useEffect, useRef } from "react";

import "./App.css";
import Loading from "./assets/loading.gif";

function App() {
  const [photos, setPhotos] = useState<any[]>([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchPhotos = async (pageNumber: number) => {
    const Access_Key = "pQyDw1N6oXTNpThjxZwFT2EarrqI51ngtPjLACDMmU8";
    const res = await fetch(
      `https://api.unsplash.com/photos/?client_id=${Access_Key}&page=${pageNumber}&per_page=${10}`
    );
    const data = await res.json();
    setPhotos((p) => [...p, ...data]);
    setLoading(true);
  };

  const loadMore = () => {
    setPageNumber((prevPageNumber) => prevPageNumber + 1);
  };

  const pageEnd = useRef<HTMLButtonElement>(null);
  let num = 1;
  useEffect(() => {
    fetchPhotos(pageNumber);
  }, [pageNumber]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          num++;
          loadMore();
        }
      },
      { threshold: 0.5 ,rootMargin: "100px"}
    );
    if (pageEnd.current) {
      observer.observe(pageEnd.current as Element);
    }
    return () => {
      if (pageEnd.current) {
        observer.unobserve(pageEnd.current as Element);
      }
    };
  }, [loading, num]);

  return (
    <div className="App">
      <h1>Infinite Scrolling Using Intersection Observer</h1>
      {photos.map((photo: any, index) => (
        <div className="photos" key={index}>
          <img src={photo.urls.small} alt="" />
          <p>{photo.user.first_name + " " + photo.user.last_name}</p>
          <span>Like: {photo.user.total_likes}</span>
        </div>
      ))}
      <div className="loading">
        <img src={Loading} />
      </div>
      <h3>{photos.length}</h3>
      <button onClick={loadMore} ref={pageEnd}>
        More
      </button>
    </div>
  );
}

export default App;
