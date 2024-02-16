import React, { useCallback, useEffect, useLayoutEffect, useRef } from "react";
import {
  Alert,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Item } from "react-navigation-header-buttons";
import Routes from "../Routes";
import SongItem from "../../components/SongItem";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import usePlaylistStore from "../../stores/usePlaylistStore";
import { useShallow } from "zustand/react/shallow";

const Home = ({ navigation }) => {
  const { playlist, fetchPlaylist, resetPlaylist, isRefreshing } =
    usePlaylistStore(
      useShallow((state) => ({
        playlist: state.playlist,
        fetchPlaylist: state.fetchPlaylist,
        resetPlaylist: state.resetPlaylist,
        isLoading: state.isLoading,
        isRefreshing: state.isRefreshing,
      }))
    );
  const insets = useSafeAreaInsets();

  const currentSwipeRef = useRef(null);

  useEffect(() => {
    fetchPlaylist();
  }, []);

  const headerRight = useCallback(
    () => (
      <Item
        title="Add"
        onPress={() => navigation.navigate(Routes.ADD_SONGS)}
      ></Item>
    ),
    [navigation]
  );

  const headerLeft = useCallback(() => {
    return (
      <Item
        title="Clear"
        onPress={() => {
          Alert.alert(
            "Clear playlist",
            "Are you sure you want to clear your playlist?",
            [
              {
                text: "Cancel",
                style: "cancel",
              },
              {
                text: "Clear",
                onPress: () => resetPlaylist(),
              },
            ]
          );
        }}
        disabled={playlist.length <= 0}
        buttonStyle={playlist.length <= 0 && { color: "gray" }}
      ></Item>
    );
  }, [playlist]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight,
      headerLeft,
    });
  }, [navigation, headerRight, headerLeft]);

  const renderItem = useCallback(
    ({ item }) => <SongItem item={item} previousRef={currentSwipeRef} />,
    []
  );

  return (
    <FlatList
      data={playlist}
      contentInset={{ bottom: insets.bottom }}
      keyExtractor={(_, index) => index.toString()}
      contentContainerStyle={{ rowGap: 10, padding: 15 }}
      renderItem={renderItem}
      refreshControl={
        <RefreshControl refreshing={isRefreshing} onRefresh={fetchPlaylist} />
      }
      ListEmptyComponent={
        !isRefreshing && (
          <View style={styles.emptyTextContainer}>
            <Text style={styles.emptyText}>No songs in the playlist yet.</Text>
          </View>
        )
      }
    />
  );
};

const styles = StyleSheet.create({
  emptyTextContainer: {
    alignItems: "center",
    padding: 10,
  },
  emptyText: {
    color: "gray",
  },
});

export default Home;
