import React, { useCallback, useRef, useState } from "react";
import { Button, ScrollView, StyleSheet, TextInput, View } from "react-native";
import usePlaylistStore from "../../stores/usePlaylistStore";
import { useShallow } from "zustand/react/shallow";

const AddSongs = ({ navigation }) => {
  const [name, setName] = useState("");
  const [artist, setArtist] = useState("");

  const { addToPlaylist, isLoading } = usePlaylistStore(
    useShallow((state) => ({
      addToPlaylist: state.addToPlaylist,
      isLoading: state.isLoading,
    }))
  );

  const firstInputRef = useRef(null);

  const handleAddSong = useCallback(() => {
    addToPlaylist(name, artist).then(() => {
      navigation.goBack();
    });
  }, [name, artist]);

  return (
    <ScrollView scrollEnabled={false}>
      <View style={styles.container}>
        <TextInput
          ref={firstInputRef}
          autoFocus
          placeholder="Song name"
          value={name}
          onChangeText={setName}
          style={styles.input}
        />
        <TextInput
          placeholder="Song artist"
          value={artist}
          onChangeText={setArtist}
          style={styles.input}
        />
      </View>

      <Button
        title="Add song"
        onPress={handleAddSong}
        disabled={isLoading || !name || !artist}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 120,
    rowGap: 15,
    margin: 20,
  },
  input: {
    flex: 1,
    borderWidth: 2,
    borderColor: "lightgray",
    borderRadius: 15,
    padding: 15,
    marginHorizontal: 15,
    backgroundColor: "white",
  },
  indicator: {
    padding: 20,
  },
});

export default AddSongs;
