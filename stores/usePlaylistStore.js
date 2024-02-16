import { create } from "zustand";
import getBackendActor from "../backend/getBackendActor";
import * as Crypto from "expo-crypto";

const actor = getBackendActor();

const usePlaylistStore = create((set, get) => ({
  playlist: [],
  isLoading: false,
  isRefreshing: false,
  fetchPlaylist: async () => {
    if (get().isRefreshing) return;

    set({ isRefreshing: true });

    actor.getPlaylist().then((data) => {
      set({ playlist: data, isRefreshing: false });
    });
  },
  addToPlaylist: async (name, artist) => {
    if (get().isLoading) return;

    set({ isLoading: true });

    const id = Crypto.randomUUID();

    actor.addToPlaylist(id, name, artist).then(() => {
      set({ isLoading: false });
    });

    set((state) => ({ playlist: [{ id, name, artist }, ...state.playlist] }));
  },
  removeFromPlaylist: async (id) => {
    set({ isLoading: true });

    actor.removeFromPlaylist(id).then(() => {
      set({ isLoading: false });
    });

    set((state) => ({
      playlist: state.playlist.filter((song) => song.id !== id),
    }));
  },
  resetPlaylist: async () => {
    set({ isLoading: true });

    actor.resetPlaylist().then(() => {
      set({ isLoading: false });
    });

    set({ playlist: [] });
  },
}));

export default usePlaylistStore;
