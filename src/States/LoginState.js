import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const LoginState = atom({
  key: "LoginState",
  default: false,
  effects_UNSTABLE: [persistAtom],
});

export const NicknameState = atom({
  key: "NicknameState",
  default: "",
  effects_UNSTABLE: [persistAtom],
});

export const IsFirstLogin = atom({
  key: "IsFirstLogin",
  default: false,
  effects_UNSTABLE: [persistAtom],
});
