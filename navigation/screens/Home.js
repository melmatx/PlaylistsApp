import React, { useCallback, useEffect, useLayoutEffect, useRef } from "react";
import {
  Alert,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from "react-native";
import {
  HiddenItem,
  Item,
  OverflowMenu,
} from "react-navigation-header-buttons";
import Routes from "../Routes";
import SongItem from "../../components/SongItem";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import usePlaylistStore from "../../stores/usePlaylistStore";
import { useShallow } from "zustand/react/shallow";
import Ionicons from "@expo/vector-icons/Ionicons";
import useAuthStore from "../../stores/useAuthStore";
import { SwipeableProvider } from "../../contexts/SwipeableContext";

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
  const logout = useAuthStore((state) => state.logout);
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
      <OverflowMenu
        OverflowIcon={({ color }) => (
          <Ionicons name={"ellipsis-horizontal"} size={20} color={color} />
        )}
      >
        <HiddenItem
          title="Clear Playlist"
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
        />
        <HiddenItem title={"Logout"} onPress={logout} />
      </OverflowMenu>
    );
  }, [playlist]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight,
      headerLeft,
    });
  }, [navigation, headerRight, headerLeft]);

  const renderItem = useCallback(({ item }) => <SongItem item={item} />, []);

  return (
    <SwipeableProvider value={{ currentSwipeRef }}>
      <FlatList
        data={playlist}
        contentInset={{ bottom: insets.bottom }}
        keyExtractor={(_, index) => index.toString()}
        contentContainerStyle={{ rowGap: 10, padding: 15 }}
        renderItem={renderItem}
        onScrollBeginDrag={() => currentSwipeRef.current?.close()}
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={fetchPlaylist} />
        }
        ListEmptyComponent={
          !isRefreshing && (
            <View style={styles.emptyTextContainer}>
              <Text style={styles.emptyText}>
                No songs in the playlist yet.
              </Text>
            </View>
          )
        }
      />
    </SwipeableProvider>
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
