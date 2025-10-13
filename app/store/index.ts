import { configureStore } from "@reduxjs/toolkit";
import adminSlice from "./slices/adminSlice";
import PlaylistSlice from "./slices/playlistSlice";
import StatsSlice from "./slices/statsSlice";
import userSlice from "./slices/userSlice";

const store = configureStore({
  reducer: {
    admin: adminSlice,
    playlists: PlaylistSlice,
    stats: StatsSlice,
    user: userSlice,
  },
});

export default store;
