import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Maximize, 
  Minimize, 
  SkipBack, 
  SkipForward,
  ArrowLeft,
  Settings
} from 'lucide-react';
import { useContent } from '../context/ContentContext';
import './WatchPage.css';

const WatchPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getContentById, addToWatchHistory, addToContinueWatching } = useContent();
  
  const [content, setContent] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [loading, setLoading] = useState(true);

  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const controlsTimeoutRef = useRef(null);

  useEffect(() => {
    const item = getContentById(id);
    if (item) {
      setContent(item);
      addToWatchHistory(item);
    }
    setLoading(false);
  }, [id, getContentById, addToWatchHistory]);

  useEffect(() => {
    const handleMouseMove = () => {
      setShowControls(true);
      clearTimeout(controlsTimeoutRef.current);
      controlsTimeoutRef.current = setTimeout(() => {
        if (isPlaying) {
          setShowControls(false);
        }
      }, 3000);
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
      return () => {
        container.removeEventListener('mousemove', handleMouseMove);
        clearTimeout(controlsTimeoutRef.current);
      };
    }
  }, [isPlaying]);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const current = videoRef.current.currentTime;
      const total = videoRef.current.duration;
      setCurrentTime(current);
      setDuration(total);

      // Save progress for continue watching
      if (content && total > 0) {
        const progress = (current / total) * 100;
        if (progress > 5 && progress < 95) { // Only save if meaningful progress
          addToContinueWatching(content, progress);
        }
      }
    }
  };

  const handleSeek = (e) => {
    const progressBar = e.currentTarget;
    const rect = progressBar.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    const newTime = pos * duration;
    
    if (videoRef.current) {
      videoRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      const newMuted = !isMuted;
      setIsMuted(newMuted);
      videoRef.current.muted = newMuted;
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const skip = (seconds) => {
    if (videoRef.current) {
      videoRef.current.currentTime += seconds;
    }
  };

  const formatTime = (time) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = Math.floor(time % 60);
    
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (!content) {
    return <div className="error">Content not found</div>;
  }

  return (
    <div className={`watch-page ${isFullscreen ? 'fullscreen' : ''}`} ref={containerRef}>
      <div className="video-container">
        {/* Video Player */}
        <video
          ref={videoRef}
          className="video-player"
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleTimeUpdate}
          poster={content.backdrop}
          onClick={togglePlay}
        >
          <source src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Video Controls */}
        <div className={`video-controls ${showControls ? 'visible' : ''}`}>
          {/* Top Controls */}
          <div className="controls-top">
            <button className="back-btn" onClick={() => navigate(-1)}>
              <ArrowLeft size={24} />
            </button>
            <div className="video-info">
              <h2>{content.title}</h2>
              <span>{content.year} • {content.genre.join(', ')}</span>
            </div>
          </div>

          {/* Center Play Button */}
          <div className="controls-center">
            <button className="play-pause-center" onClick={togglePlay}>
              {isPlaying ? <Pause size={60} /> : <Play size={60} fill="currentColor" />}
            </button>
          </div>

          {/* Bottom Controls */}
          <div className="controls-bottom">
            <div className="progress-container">
              <div className="progress-bar" onClick={handleSeek}>
                <div 
                  className="progress-filled"
                  style={{ width: `${(currentTime / duration) * 100}%` }}
                ></div>
                <div 
                  className="progress-handle"
                  style={{ left: `${(currentTime / duration) * 100}%` }}
                ></div>
              </div>
            </div>

            <div className="controls-row">
              <div className="controls-left">
                <button className="control-btn" onClick={togglePlay}>
                  {isPlaying ? <Pause size={20} /> : <Play size={20} fill="currentColor" />}
                </button>
                
                <button className="control-btn" onClick={() => skip(-10)}>
                  <SkipBack size={20} />
                </button>
                
                <button className="control-btn" onClick={() => skip(10)}>
                  <SkipForward size={20} />
                </button>

                <div className="volume-control">
                  <button className="control-btn" onClick={toggleMute}>
                    {isMuted || volume === 0 ? <VolumeX size={20} /> : <Volume2 size={20} />}
                  </button>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={isMuted ? 0 : volume}
                    onChange={handleVolumeChange}
                    className="volume-slider"
                  />
                </div>

                <div className="time-display">
                  <span>{formatTime(currentTime)} / {formatTime(duration)}</span>
                </div>
              </div>

              <div className="controls-right">
                <button className="control-btn">
                  <Settings size={20} />
                </button>
                
                <button className="control-btn" onClick={toggleFullscreen}>
                  {isFullscreen ? <Minimize size={20} /> : <Maximize size={20} />}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Loading Overlay */}
        {loading && (
          <div className="video-loading">
            <div className="loading-spinner"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WatchPage;