import React, { createContext, useState, useEffect } from 'react';
import SoundPlayer from 'react-native-sound-player';
import RNFS from 'react-native-fs';
import { Alert } from 'react-native';

export const MusicContext = createContext();

const MusicProvider = ({ children }) => {
  const [songs, setSongs] = useState([]);
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    scanMusicFiles();
  }, []);

  const scanMusicFiles = async () => {
    try {
      const musicDir = RNFS.ExternalStorageDirectoryPath + '/Music';
      const files = await RNFS.readDir(musicDir);
      const mp3Files = files.filter(file => file.isFile() && file.name.endsWith('.mp3'));

      const songsList = mp3Files.map(file => ({
        path: file.path,
        name: file.name.replace('.mp3', ''),
        artist: 'Unknown Artist',
        album: 'Unknown Album',
        albumArt: require('../assets/default_album.jpg'),
      }));

      setSongs(songsList);
    } catch (err) {
      Alert.alert('Error scanning music', err.message);
    }
  };

  const playSong = (song) => {
    try {
      SoundPlayer.playUrl('file://' + song.path);
      setCurrentSong(song);
      setIsPlaying(true);
    } catch (e) {
      Alert.alert('Error', e.message);
    }
  };

  const pauseSong = () => {
    try {
      SoundPlayer.pause();
      setIsPlaying(false);
    } catch (e) {
      Alert.alert('Error', e.message);
    }
  };

  const resumeSong = () => {
    try {
      SoundPlayer.resume();
      setIsPlaying(true);
    } catch (e) {
      Alert.alert('Error', e.message);
    }
  };

  const changeSong = (direction) => {
    if (songs.length === 0) return;
    const currentIndex = songs.findIndex(song => song.path === currentSong?.path);
    const newIndex = (currentIndex + direction + songs.length) % songs.length;
    playSong(songs[newIndex]);
  };

  return (
    <MusicContext.Provider value={{ songs, currentSong, isPlaying, playSong, pauseSong, resumeSong, changeSong }}>
      {children}
    </MusicContext.Provider>
  );
};

export default MusicProvider;
