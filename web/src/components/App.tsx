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
  duration: number;
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

const Announcement: React.FC<AnnouncementProps> = ({ type, message, duration }) => {
  const [position, setPosition] = useState(100);

  useEffect(() => {
    const animationInterval = setInterval(() => {
      setPosition((prevPosition) => {
        if (prevPosition < -100) {
          return 100;
        }
        return prevPosition - 0.3;
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

const App: React.FC = () => {
  const [showAnnouncement, setShowAnnouncement] = useState(false);
  const [announcementType, setAnnouncementType] = useState<'police' | 'ems' | 'disaster'>('police');
  const [announcementMessage, setAnnouncementMessage] = useState("");
  const [announcementDuration, setAnnouncementDuration] = useState(5000);
  
  useNuiEvent<{ type: 'police' | 'ems' | 'disaster'; message: string; duration: number }>('showAnnouncement', (data) => {
    setAnnouncementType(data.type);
    setAnnouncementMessage(data.message);
    setAnnouncementDuration(data.duration);
    setShowAnnouncement(true);
    setTimeout(() => setShowAnnouncement(false), data.duration);
  });

  return (
    <div className="nui-wrapper">
      {showAnnouncement && 
        <Announcement 
          type={announcementType} 
          message={announcementMessage} 
          duration={announcementDuration} 
        />
      }
    </div>
  );
};

export default App;