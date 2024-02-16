import { Platform } from "react-native";
import { blsVerify } from "@dfinity/bls-verify";
import { createActor, canisterId } from "./declarations/playlists";

const host =
  Platform.OS === "android" ? "http://10.0.2.2:4943" : "http://127.0.0.1:4943";

const getBackendActor = (options = {}) => {
  return createActor(canisterId, {
    agentOptions: {
      host,
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
      verifyQuerySignatures: false,
    },
    actorOptions: {
      blsVerify,
    },
    ...options,
  });
};

export default getBackendActor;
