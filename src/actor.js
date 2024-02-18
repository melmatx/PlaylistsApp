import { Platform } from "react-native";
import { blsVerify } from "@dfinity/bls-verify";
import { createActor } from "./declarations/playlists";

const CANISTER_ID = "bd3sg-teaaa-aaaaa-qaaba-cai";

const NETWORK =
  Platform.OS === "android" ? "http://10.0.2.2:4943" : "http://127.0.0.1:4943";

const getBackendActor = (identity) => {
  return createActor(CANISTER_ID, {
    agentOptions: {
      host: NETWORK,
      identity,
      fetchOptions: {
        reactNative: {
          __nativeResponseType: "base64",
        },
      },
      callOptions: {
        reactNative: {
          textStreaming: true,
        },
      },
      verifyQuerySignatures: true,
    },
    actorOptions: {
      blsVerify,
    },
  });
};

export default getBackendActor;
