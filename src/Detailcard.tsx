import React, { useEffect, useState } from 'react';
import './Detailcard.css'; // Import the CSS file

interface DetailcardProps {
  name: string;
  title: string;
  desc: string;
}

interface ImageResult {
  cover_photo: {
    urls: {
      small: string;
    };
  };
}

const Detailcard = ({ name, title, desc }: DetailcardProps) => {
  const [images, setImages] = useState<string[]>([]);
  const [startIndex, setStartIndex] = useState(0);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch(
          `https://api.unsplash.com/search/collections?page=1&query=${title}&client_id=AccgWvafEdpAiDy8Vx9WFoTYDsDrHazVHX77YhdYVxo`
        );
        const data = await response.json();
        const imageUrls = data.results.map((result: ImageResult) => result.cover_photo.urls.small);
        setImages(imageUrls);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    fetchImages();
  }, [title]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setStartIndex((prevIndex) => (prevIndex + 9) % images.length);
    }, 10000);

    return () => clearInterval(intervalId);
  }, [images]);

  const getCurrentImages = () => {
    const currentImages = images.slice(startIndex, startIndex + 9);
    return currentImages.length < 9
      ? [...currentImages, ...images.slice(0, 9 - currentImages.length)]
      : currentImages;
  };

  return (
    <div className="detailcard-container">
      <h1 className="detailcard-header">{name} details here</h1>
      <div className="detailcard-info">
        <h3>Role: {title}</h3>
        <p>Address: {desc}</p>
      </div>
      <div className="image-grid">
        {getCurrentImages().map((url, index) => (
          <img
            key={index}
            src={url}
            alt={`Image ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Detailcard;
