import { create } from 'zustand';
import { persist } from "zustand/middleware";
import { ComponentName } from '../enums/all.enum';

interface MainState {
  componentName : ComponentName;
  groupComponentName : ComponentName;
  setComponent : (component: ComponentName) => void;
  setGroupComponent : (component: ComponentName) => void;
}

export const useMainComponents = create<MainState>()(
  persist((set) => ({
    componentName: ComponentName.Posts,
    groupComponentName: ComponentName.AboutGroup,

    setComponent: (component: ComponentName) => {
      set({
        componentName: component,
      })
    },

    setGroupComponent: (component: ComponentName) => {
      set({
        groupComponentName: component,
      })
    }
  }), { name: 'mainComponentStorage', })
)

