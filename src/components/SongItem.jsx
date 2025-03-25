import React from 'react';
import { TouchableOpacity, Image, Text, StyleSheet } from 'react-native';

const SongItem = ({ song, onPress }) => {
  return (
    <TouchableOpacity style={styles.songCard} onPress={onPress}>
      <Image source={song.albumArt} style={styles.albumArt} />
      <Text numberOfLines={1} style={styles.songTitle}>{song.name}</Text>
      <Text style={styles.songDetails}>{song.artist} • {song.album}</Text>
    </TouchableOpacity>
  );
};

export default SongItem;

const styles = StyleSheet.create({
  songCard: { width: '48%', margin: '1%', padding: 10, alignItems: 'center', backgroundColor: '#fff', borderRadius: 10, elevation: 3 },
  albumArt: { width: 80, height: 80, borderRadius: 8 },
  songTitle: { color: '#333', marginTop: 5, fontSize: 14, textAlign: 'center', fontWeight: 'bold' },
  songDetails: { color: '#777', fontSize: 12, textAlign: 'center' },
});
