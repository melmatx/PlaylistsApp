import { create } from "zustand";
import {
  Ed25519KeyIdentity,
  DelegationChain,
  DelegationIdentity,
  isDelegationValid,
} from "@dfinity/identity";
import { toHex } from "@dfinity/agent";
import * as SecureStore from "expo-secure-store";
import * as WebBrowser from "expo-web-browser";
import * as Linking from "expo-linking";
import AsyncStorage from "@react-native-async-storage/async-storage";
import getBackendActor from "../src/actor";

const initialState = {
  baseKey: "",
  identity: "",
  isReady: false,
};

const useAuthStore = create((set, get) => ({
  ...initialState,
  fetchKeyAndIdentity: async () => {
    // Get base key
    let baseKey = SecureStore.getItem("baseKey");

    if (baseKey) {
      baseKey = Ed25519KeyIdentity.fromJSON(baseKey);
    } else {
      baseKey = Ed25519KeyIdentity.generate();

      SecureStore.setItem("baseKey", JSON.stringify(baseKey.toJSON()));
    }

    // Get identity from delegation
    const delegation = await AsyncStorage.getItem("delegation");

    // If delegation exists, check if it's valid
    if (delegation) {
      const chain = DelegationChain.fromJSON(JSON.parse(delegation));

      if (isDelegationValid(chain)) {
        const id = new DelegationIdentity(baseKey, chain);

        // Set identity with the base key
        set({ baseKey, identity: id, isReady: true });
      } else {
        await AsyncStorage.removeItem("delegation");
      }
    }

    set({ baseKey, isReady: true });
  },
  setIdentity: async (delegation) => {
    // Decode delegation from uri result
    const decodedFromUri = decodeURIComponent(delegation);
    const chain = DelegationChain.fromJSON(JSON.parse(decodedFromUri));

    // Get identity
    const id = DelegationIdentity.fromDelegation(get().baseKey, chain);

    // Save delegation
    await AsyncStorage.setItem("delegation", JSON.stringify(chain.toJSON()));

    // Dismiss the browser
    WebBrowser.dismissBrowser();

    set({ identity: id });
  },
  getActor: () => {
    if (!get().identity) {
      throw new Error("Identity not set");
    }

    return getBackendActor(get().identity);
  },
  login: async () => {
    // Get public key
    const publicDerKey = toHex(get().baseKey.getPublicKey().toDer());
    const url = new URL(
      "http://localhost:4943/?canisterId=bkyz2-fmaaa-aaaaa-qaaaq-cai"
    ); // Replace with own canister url

    // Set redirect uri
    const prefix = Linking.createURL("/");
    url.searchParams.set("redirect_uri", encodeURIComponent(prefix));

    // Set public key
    url.searchParams.set("pubkey", publicDerKey);

    return await WebBrowser.openBrowserAsync(url.toString());
  },
  logout: async () => {
    await AsyncStorage.removeItem("delegation");
    set({ identity: "" });
  },
}));

export default useAuthStore;
