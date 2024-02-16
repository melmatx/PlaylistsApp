import { create } from "zustand";
import getBackendActor from "../backend/getBackendActor";
import * as Crypto from "expo-crypto";
import { Alert } from "react-native";
import Toast from "react-native-root-toast";
import toastOptions from "../utils/toastOptions";

const actor = getBackendActor();

const usePlaylistStore = create((set, get) => ({
  playlist: [],
  isLoading: false,
  isRefreshing: false,
  fetchPlaylist: async () => {
    if (get().isRefreshing) return;

    set({ isRefreshing: true });

    actor
      .getPlaylist()
      .then((data) => {
        set({ playlist: data });
      })
      .catch((err) => {
        console.log(err);
        Alert.alert("Failed to fetch playlist");
      })
      .finally(() => {
        set({ isRefreshing: false });
      });
  },
  addToPlaylist: async (name, artist) => {
    if (get().isLoading) return;

    set({ isLoading: true });

    const id = Crypto.randomUUID();

    actor
      .addToPlaylist(id, name, artist)
      .then(() => {
        Toast.show("Song added to playlist.", toastOptions);
      })
      .catch((err) => {
        console.log(err);
        Alert.alert("Failed to add song to playlist");
      })
      .finally(() => {
        set({ isLoading: false });
      });

    set((state) => ({ playlist: [{ id, name, artist }, ...state.playlist] }));
  },
  removeFromPlaylist: async (id) => {
    set({ isLoading: true });

    actor
      .removeFromPlaylist(id)
      .then(() => {
        Toast.show("Song removed from playlist.", toastOptions);
      })
      .catch((err) => {
        console.log(err);
        Alert.alert("Failed to remove song from playlist");
      })
      .finally(() => {
        set({ isLoading: false });
      });

    set((state) => ({
      playlist: state.playlist.filter((song) => song.id !== id),
    }));
  },
  resetPlaylist: async () => {
    set({ isLoading: true });

    actor
      .resetPlaylist()
      .then(() => {
        Toast.show("Playlist reset successfully.", toastOptions);
      })
      .catch((err) => {
        console.log(err);
        Alert.alert("Failed to reset playlist");
      })
      .finally(() => {
        set({ isLoading: false });
      });

    set({ playlist: [] });
  },
}));

export default usePlaylistStore;
