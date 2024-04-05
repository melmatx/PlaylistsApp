import { Platform } from "react-native";
import { createActor } from "./declarations/playlists";

const CANISTER_ID = "be2us-64aaa-aaaaa-qaabq-cai";

const NETWORK =
  Platform.OS === "android" ? "http://10.0.2.2:4943" : "http://127.0.0.1:4943";

const getBackendActor = (identity) => {
  return createActor(CANISTER_ID, {
    agentOptions: {
      host: NETWORK,
      identity,
    },
  });
};

export default getBackendActor;
