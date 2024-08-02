import React, { useState, useEffect } from "react";
import "./App.css";
import { debugData } from "../utils/debugData";
import { fetchNui } from "../utils/fetchNui";
import { useNuiEvent } from "../hooks/useNuiEvent";

debugData([
  {
    action: "setVisible",
    data: true,
  },
]);

interface AnnouncementProps {
  type: 'police' | 'ems' | 'disaster';
  message: string;
  speed: number;
}

const getAnnouncementStyle = (type: 'police' | 'ems' | 'disaster') => {
  switch (type) {
    case 'police':
      return {
        backgroundColor: 'rgba(0, 0, 100, 0.9)',
        boxShadow: '0 0 20px rgba(0, 0, 255, 0.5)',
        border: '2px solid #00f',
      };
    case 'ems':
      return {
        backgroundColor: 'rgba(100, 0, 0, 0.9)',
        boxShadow: '0 0 20px rgba(255, 0, 0, 0.5)',
        border: '2px solid #f00',
      };
    case 'disaster':
      return {
        backgroundColor: 'rgba(100, 60, 0, 0.9)',
        boxShadow: '0 0 20px rgba(255, 165, 0, 0.5)',
        border: '2px solid #ffa500',
      };
  }
};

const getAnnouncementIcon = (type: 'police' | 'ems' | 'disaster') => {
  switch (type) {
    case 'police': return '🚨';
    case 'ems': return '🚑';
    case 'disaster': return '⚠️';
  }
};

const Announcement: React.FC<AnnouncementProps> = ({ type, message, speed }) => {
  const [position, setPosition] = useState(100);

  useEffect(() => {
    const animationInterval = setInterval(() => {
      setPosition((prevPosition) => {
        if (prevPosition < -100) {
          return 100;
        }
        return prevPosition - speed;
      });
    }, 20);

    return () => clearInterval(animationInterval);
  }, []);

  const style = getAnnouncementStyle(type);
  const icon = getAnnouncementIcon(type);

  return (
    <div
      className="announcement-container"
      style={{
        position: 'fixed',
        top: 50,
        left: '50%',
        transform: 'translateX(-50%)',
        color: 'white',
        padding: '15px 25px',
        borderRadius: '10px',
        width: '90%',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        ...style,
      }}
    >
      <div
        className="announcement-header"
        style={{
          fontWeight: 'bold',
          fontSize: '1.2em',
          marginBottom: '10px',
          textAlign: 'center',
          textTransform: 'uppercase',
        }}
      >
        {icon} {type.toUpperCase()} ANNOUNCEMENT {icon}
      </div>
      <div
        className="announcement-text"
        style={{
          position: 'relative',
          left: `${position}%`,
          transition: 'left 0.02s linear',
          fontSize: '1.1em',
        }}
      >
        {message}
      </div>
    </div>
  );
};


//Image Add

interface ImageAnnouncementProps {
  imageUrl: string;
  duration: number;
}

const ImageAnnouncement: React.FC<ImageAnnouncementProps> = ({ imageUrl, duration }) => {
  const [position, setPosition] = useState(100);

  useEffect(() => {
    const animationDuration = 1000; // 1 second for the slide-in/out animation
    const holdDuration = duration - (2 * animationDuration); // Hold in the center

    const slideIn = setTimeout(() => setPosition(0), 100);
    const slideOut = setTimeout(() => setPosition(-100), holdDuration + animationDuration);

    return () => {
      clearTimeout(slideIn);
      clearTimeout(slideOut);
    };
  }, [duration]);

  return (
    <div
      className="image-announcement-container"
      style={{
        position: 'fixed',
        top: '50%',
        right: `${position}%`,
        transform: 'translate(0, -50%)',
        color: 'white',
        padding: '20px',
        transition: 'right 1s ease-in-out',
        width: '400px', // Fixed width
        height: '300px', // Fixed height
        textAlign: 'center',
        overflow: 'hidden', // In case content exceeds fixed size
      }}
    >
      <div style={{ 
        width: '100%', 
        height: 'calc(100% - 40px)', // Adjust based on title size
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <img 
          src={imageUrl} 
          alt={"img"} 
          style={{ 
            maxWidth: '100%', 
            maxHeight: '100%', 
            objectFit: 'contain',
            opacity: 0.7, // Reduced opacity
          }} 
        />
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [showAnnouncement, setShowAnnouncement] = useState(false);
  const [announcementType, setAnnouncementType] = useState<'police' | 'ems' | 'disaster'>('police');
  const [announcementMessage, setAnnouncementMessage] = useState("");
  const [announcementDuration, setAnnouncementDuration] = useState(5000);
  const [announcementSpeed, setAnnouncementSpeed] = useState(0.3);

  const [showImageAnnouncement, setShowImageAnnouncement] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [imageDuration, setImageDuration] = useState(5000);
  
  useNuiEvent<{ type: 'police' | 'ems' | 'disaster'; message: string; duration: number, speed: number }>('showAnnouncement', (data) => {
    setAnnouncementType(data.type);
    setAnnouncementMessage(data.message);
    setAnnouncementDuration(data.duration);
    setAnnouncementSpeed(data.speed);
    setShowAnnouncement(true);
    setTimeout(() => setShowAnnouncement(false), data.duration);
  });

  useNuiEvent<{ link: string; duration: number }>('showAdd', (data) => {
    setImageUrl(data.link);
    setImageDuration(data.duration);
    setShowImageAnnouncement(true);
    setTimeout(() => setShowImageAnnouncement(false), data.duration);
  });

  return (
    <div className="nui-wrapper">
      {showAnnouncement && 
        <Announcement 
          type={announcementType} 
          message={announcementMessage} 
          speed={announcementSpeed}

        />
      }
       {showImageAnnouncement && 
        <ImageAnnouncement 
          imageUrl={imageUrl} 
          duration={imageDuration} 
        />
      }
    </div>
  );
};

export default App;