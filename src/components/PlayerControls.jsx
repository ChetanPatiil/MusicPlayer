// import React from 'react';
// import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

// const PlayerControls = ({ currentSong, isPlaying, onPause, onPlay, onNext, onPrev }) => {
//   return (
//     <View style={styles.playerControls}>
//       <Image source={currentSong.albumArt} style={styles.currentAlbumArt} />
//       <Text numberOfLines={1} style={styles.currentSongTitle}>{currentSong.name}</Text>
//       <Text style={styles.songDetails}>{currentSong.artist} • {currentSong.album}</Text>

//       <View style={styles.controlButtons}>
//         <TouchableOpacity onPress={onPrev} style={styles.controlButton}>
//           <Text style={styles.controlText}>⏮ Prev</Text>
//         </TouchableOpacity>
//         <TouchableOpacity onPress={isPlaying ? onPause : onPlay} style={styles.controlButton}>
//           <Text style={styles.controlText}>{isPlaying ? '⏸ Pause' : '▶ Play'}</Text>
//         </TouchableOpacity>
//         <TouchableOpacity onPress={onNext} style={styles.controlButton}>
//           <Text style={styles.controlText}>⏭ Next</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// export default PlayerControls;

// const styles = StyleSheet.create({
//   playerControls: { position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: '#fff', padding: 15, alignItems: 'center', borderTopWidth: 1, borderColor: '#ddd' },
//   currentAlbumArt: { width: 100, height: 100, borderRadius: 10, marginBottom: 10 },
//   currentSongTitle: { color: '#333', fontSize: 16, fontWeight: 'bold', textAlign: 'center' },
//   controlButtons: { flexDirection: 'row', justifyContent: 'space-around', width: '100%', marginTop: 10 },
//   controlButton: { backgroundColor: '#ff9800', paddingVertical: 10, paddingHorizontal: 20, borderRadius: 5, marginHorizontal: 5 },
//   controlText: { color: 'white', fontSize: 16, fontWeight: 'bold' },
// });


import React, { useContext } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { MusicContext } from '../context/MusicContext';

const PlayerControls = () => {
  const { currentSong, isPlaying, pauseSong, resumeSong, changeSong } = useContext(MusicContext);

  if (!currentSong) return null;

  return (
    <View style={styles.playerControls}>
      <Image source={currentSong.albumArt} style={styles.currentAlbumArt} />
      <Text numberOfLines={1} style={styles.currentSongTitle}>{currentSong.name}</Text>
      <Text style={styles.songDetails}>{currentSong.artist} • {currentSong.album}</Text>

      <View style={styles.controlButtons}>
        <TouchableOpacity onPress={() => changeSong(-1)} style={styles.controlButton}>
          <Text style={styles.controlText}>⏮ Prev</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={isPlaying ? pauseSong : resumeSong} style={styles.controlButton}>
          <Text style={styles.controlText}>{isPlaying ? '⏸ Pause' : '▶ Play'}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => changeSong(1)} style={styles.controlButton}>
          <Text style={styles.controlText}>⏭ Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PlayerControls;

const styles = StyleSheet.create({
  playerControls: { position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: '#fff', padding: 15, alignItems: 'center', borderTopWidth: 1, borderColor: '#ddd' },
  currentAlbumArt: { width: 100, height: 100, borderRadius: 10, marginBottom: 10 },
  currentSongTitle: { color: '#333', fontSize: 16, fontWeight: 'bold', textAlign: 'center' },
  controlButtons: { flexDirection: 'row', justifyContent: 'space-around', width: '100%', marginTop: 10 },
  controlButton: { backgroundColor: '#ff9800', paddingVertical: 10, paddingHorizontal: 20, borderRadius: 5, marginHorizontal: 5 },
  controlText: { color: 'white', fontSize: 16, fontWeight: 'bold' },
});
