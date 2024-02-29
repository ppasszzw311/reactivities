import { createContext, useContext } from "react";
import ActivityStore from "./activityStore";

interface Store {
    activityStore: ActivityStore
}

export const store: Store = {
    activityStore: new ActivityStore()
}

export const StoreContext = createContext(store);

// 製作取用自己的store的hook
export function useStore() {
    return useContext(StoreContext);
}