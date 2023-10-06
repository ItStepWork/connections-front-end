import { create } from 'zustand';
import { persist } from "zustand/middleware";
import { ComponentName } from '../enums/all.enum';

interface MainState {
  componentName : ComponentName;
  setComponent : (component: ComponentName) => void;
}

export const useMainComponents = create<MainState>()(
  persist((set) => ({
    componentName: ComponentName.Posts,
    setComponent: (component: ComponentName) => {
      set({
        componentName: component,
      })
    }
  }), { name: 'mainComponentStorage', })
)

