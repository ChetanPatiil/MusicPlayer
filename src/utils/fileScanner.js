import RNFS from 'react-native-fs';
import { Alert } from 'react-native';

export const scanMusicFiles = async (setSongs) => {
  try {
    const musicDir = RNFS.ExternalStorageDirectoryPath + '/Music'; // Default music folder on Android
    const files = await RNFS.readDir(musicDir);

    const mp3Files = files.filter(file => file.isFile() && file.name.endsWith('.mp3'));

    const songsList = mp3Files.map(file => ({
      path: file.path,
      name: file.name.replace('.mp3', ''), 
      artist: 'Unknown Artist',
      album: 'Unknown Album',
      albumArt: require('../assets/default_album.jpg') // Default album art
    }));

    setSongs(songsList);
  } catch (err) {
    Alert.alert('Error scanning music', err.message);
  }
};
