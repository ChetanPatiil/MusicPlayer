
// import React, { useEffect, useState } from 'react';
// import { View, Text, FlatList, Alert, StyleSheet } from 'react-native';
// import SongItem from '../components/SongItem';
// import PlayerControls from '../components/PlayerControls';
// import { requestPermissions } from '../utils/permissions';
// import { scanMusicFiles } from '../utils/fileScanner';
// import SoundPlayer from 'react-native-sound-player';

// const MusicPlayer = () => {
//   const [songs, setSongs] = useState([]);
//   const [currentSong, setCurrentSong] = useState(null);
//   const [isPlaying, setIsPlaying] = useState(false);

//   useEffect(() => {
//     requestPermissions()
//       .then(granted => granted && scanMusicFiles(setSongs))
//       .catch(err => Alert.alert('Error', err.message));
//   }, []);

//   const playSong = (song) => {
//     try {
//       SoundPlayer.playUrl('file://' + song.path);
//       setCurrentSong(song);
//       setIsPlaying(true);
//     } catch (e) {
//       Alert.alert('Error', e.message);
//     }
//   };

//   const pauseSong = () => {
//     try {
//       SoundPlayer.pause();
//       setIsPlaying(false);
//     } catch (e) {
//       Alert.alert('Error', e.message);
//     }
//   };

//   const resumeSong = () => {
//     try {
//       SoundPlayer.resume();
//       setIsPlaying(true);
//     } catch (e) {
//       Alert.alert('Error', e.message);
//     }
//   };

//   const changeSong = (direction) => {
//     if (songs.length === 0) return;
//     const currentIndex = songs.findIndex(song => song.path === currentSong?.path);
//     const newIndex = (currentIndex + direction + songs.length) % songs.length;
//     playSong(songs[newIndex]);
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.header}>🎵 My Music</Text>

//       <FlatList
//         data={songs}
//         keyExtractor={(item) => item.path}
//         numColumns={2}
//         contentContainerStyle={styles.songList}
//         renderItem={({ item }) => <SongItem song={item} onPress={() => playSong(item)} />}
//         ListEmptyComponent={<Text style={styles.noSongsText}>No songs found.</Text>}
//       />

//       {currentSong && (
//         <PlayerControls
//           currentSong={currentSong}
//           isPlaying={isPlaying}
//           onPause={pauseSong}
//           onPlay={resumeSong}
//           onNext={() => changeSong(1)}
//           onPrev={() => changeSong(-1)}
//         />
//       )}
//     </View>
//   );
// };

// export default MusicPlayer;

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: '#f5f5f5', padding: 16 },
//   header: { fontSize: 22, fontWeight: 'bold', textAlign: 'center', color: '#333', marginBottom: 10 },
//   songList: { paddingBottom: 80 },
//   noSongsText: { textAlign: 'center', color: '#777', marginTop: 20 },
// });


import React, { useContext } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { MusicContext } from '../context/MusicContext';
import SongItem from '../components/SongItem';
import PlayerControls from '../components/PlayerControls';

const MusicPlayer = () => {
  const { songs, currentSong, isPlaying, playSong, pauseSong, resumeSong, changeSong } = useContext(MusicContext);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>🎵 My Music</Text>

      <FlatList
        data={songs}
        keyExtractor={(item) => item.path}
        numColumns={2}
        contentContainerStyle={styles.songList}
        renderItem={({ item }) => <SongItem song={item} onPress={() => playSong(item)} />}
        ListEmptyComponent={<Text style={styles.noSongsText}>No songs found.</Text>}
      />

      {currentSong && (
        <PlayerControls
          currentSong={currentSong}
          isPlaying={isPlaying}
          onPause={pauseSong}
          onPlay={resumeSong}
          onNext={() => changeSong(1)}
          onPrev={() => changeSong(-1)}
        />
      )}
    </View>
  );
};

export default MusicPlayer;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5', padding: 16 },
  header: { fontSize: 22, fontWeight: 'bold', textAlign: 'center', color: '#333', marginBottom: 10 },
  songList: { paddingBottom: 80 },
  noSongsText: { textAlign: 'center', color: '#777', marginTop: 20 },
});
