import React, { useContext } from 'react';
import { View, FlatList, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { MusicContext } from '../context/MusicContext';

const MusicList = () => {
  const { songs, playSong } = useContext(MusicContext);

  const renderSong = ({ item }) => (
    <TouchableOpacity style={styles.songCard} onPress={() => playSong(item)}>
      <Image source={item.albumArt} style={styles.albumArt} />
      <Text numberOfLines={1} style={styles.songTitle}>{item.name}</Text>
      <Text style={styles.songDetails}>{item.artist} • {item.album}</Text>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={songs}
      keyExtractor={(item) => item.path}
      numColumns={2}
      contentContainerStyle={styles.songList}
      renderItem={renderSong}
      ListEmptyComponent={<Text style={styles.noSongsText}>No songs found.</Text>}
    />
  );
};

export default MusicList;

const styles = StyleSheet.create({
  songCard: { width: '48%', margin: '1%', padding: 10, alignItems: 'center', backgroundColor: '#fff', borderRadius: 10, elevation: 3 },
  albumArt: { width: 80, height: 80, borderRadius: 8 },
  songTitle: { color: '#333', marginTop: 5, fontSize: 14, textAlign: 'center', fontWeight: 'bold' },
  songDetails: { color: '#777', fontSize: 12, textAlign: 'center' },
  songList: { paddingBottom: 80 },
  noSongsText: { textAlign: 'center', color: '#777', marginTop: 20 },
});
