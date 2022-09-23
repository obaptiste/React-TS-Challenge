import React, { useState, useEffect } from 'react';
import { getPublicContent } from '../services/music.service';
import Card from '../components/Card';
import dummyData from "../dummyData.json"; // To be replaced with your api response data


export const Home:React.FC = () => {
  const [content, setContent] = useState<string>("");

  useEffect(() => {
    getPublicContent().then(
      (response) => {
        setContent(response.data);
      },
      (error) => {
        const _content = 
        (error.response && error.response.data) || error.message || error.toString();
        
        setContent(_content);
      }
    );
  }, []);

  return (
    <>
      <h1>Space X Ships</h1>
      <div className="App" style={{display: "grid", gridTemplateColumns: "1fr 1fr 1fr", rowGap: "10px", columnGap: "20px"}}>
      <header className="jumbotron">
        <h3>{content}</h3>
      </header>
        <Card image={dummyData.image} name={dummyData.name} home_port={dummyData.home_port} roles={dummyData.roles} />
      </div>
    </>
  );
};

export default Home;