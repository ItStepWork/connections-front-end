import { create } from 'zustand';
import { persist } from "zustand/middleware";
import { Locale } from '../i18n.config';

interface LocalState {
  localization : Locale;
  setLocal : (local: Locale) => void;
}

export const useLocalization = create<LocalState>()(
  persist((set) => ({
    localization: 'ua',

    setLocal: (local: Locale) => {
      set({
        localization: local,
      })
    },
    
  }), { name: 'localizationStorage', version: 1.0 })
)