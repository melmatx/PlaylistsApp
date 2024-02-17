import React, { memo, useCallback, useRef } from "react";
import { Alert, PlatformColor, StyleSheet, Text, View } from "react-native";
import {
  BorderlessButton,
  RectButton,
  Swipeable,
} from "react-native-gesture-handler";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import { useFocusEffect } from "@react-navigation/native";
import usePlaylistStore from "../stores/usePlaylistStore";
import { useShallow } from "zustand/react/shallow";
import { useSwipeableContext } from "../contexts/SwipeableContext";

const SongItem = ({ item }) => {
  const swipeRef = useRef(null);

  const { currentSwipeRef } = useSwipeableContext();
  const { removeFromPlaylist } = usePlaylistStore(
    useShallow((state) => ({
      removeFromPlaylist: state.removeFromPlaylist,
      isLoading: state.isLoading,
    }))
  );

  // Close the swipeable when the screen loses focus
  useFocusEffect(
    useCallback(() => {
      return () => {
        swipeRef.current?.close();
      };
    }, [])
  );

  const onSwipeableWillOpen = useCallback(() => {
    if (currentSwipeRef && currentSwipeRef.current !== null) {
      if (currentSwipeRef.current !== swipeRef.current) {
        currentSwipeRef.current?.close();
      }
    }
    currentSwipeRef.current = swipeRef.current;
  }, [currentSwipeRef]);

  const renderRightActions = useCallback(() => {
    return (
      <BorderlessButton
        activeOpacity={0.8}
        onPress={() =>
          removeFromPlaylist(item.id).then(() => {
            swipeRef.current?.close();
          })
        }
      >
        <View style={styles.deleteButton}>
          <Text style={styles.deleteText}>Delete</Text>
        </View>
      </BorderlessButton>
    );
  });

  return (
    <Swipeable
      ref={swipeRef}
      onSwipeableWillOpen={onSwipeableWillOpen}
      renderRightActions={renderRightActions}
      overshootRight={false}
    >
      <RectButton style={styles.mainContainer}>
        <View style={styles.contentContainer}>
          <Text style={styles.songName}>{item.name}</Text>
          <Text style={styles.songArtist}>{item.artist}</Text>
        </View>
        <BorderlessButton
          onPress={() =>
            Alert.alert("Playing...", `${item.name} - ${item.artist}`)
          }
        >
          <MaterialIcon
            name="play-circle"
            size={40}
            color={PlatformColor("systemBlue")}
          />
        </BorderlessButton>
      </RectButton>
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderColor: "gray",
    borderRadius: 10,
    padding: 20,
    justifyContent: "space-between",
  },
  contentContainer: {
    rowGap: 5,
  },
  songName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  songArtist: {
    fontSize: 14,
    color: "gray",
  },
  deleteButton: {
    height: "100%",
    width: 100,
    backgroundColor: PlatformColor("systemRed"),
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  deleteText: {
    color: "white",
  },
});

export default memo(SongItem);
