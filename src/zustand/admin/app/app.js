import { create } from 'zustand';

export const useInfoApp = create((set) => ({
  hasInfo: false,

  nameAppShort: '',
  nameAppLarge: '',
  setNamesApp: (names) =>
    set(() => ({
      nameAppShort: names.nombreCorto,
      nameAppLarge: names.nombreLargo,
    })),

  activePoints: true,
  setActivePoints: (active) => set(() => ({ activePoints: active })),
  costo: 0,
  setCostoPunto: (costo) => set(() => ({ costo: Number(costo) })),
  valuePoint: 0,
  setValuePoint: (costo) => set(() => ({ valuePoint: Number(costo) })),
  activeBadges: true,
  setActiveBadges: (active) => set(() => ({ activeBadges: active })),
  badges: [{ badge: '', minMoney: 0, discountRate: 0 }],
  addBadge: () =>
    set((state) => ({
      badges: [...state.badges, { badge: '', minMoney: 0, discountRate: 0 }],
    })),
  deleteLastBadges: () =>
    set((state) => {
      const resArray = [...state.badges];
      resArray.pop();
      return { badges: resArray };
    }),
  editBadgeName: (badgeName, index) =>
    set((state) => {
      const newArray = [...state.badges];
      newArray[index].badge = badgeName;
      return { badges: newArray };
    }),
  editBadgeMinMoney: (money, index) =>
    set((state) => {
      const newArray = [...state.badges];
      newArray[index].minMoney = money;
      return { badges: newArray };
    }),
  editBadgeDiscountRate: (rate, index) =>
    set((state) => {
      const newArray = [...state.badges];
      newArray[index].discountRate = rate;
      return { badges: newArray };
    }),

  setSettingsBadgesAndPoints: (settings) =>
    set(() => ({
      hasInfo: true,
      activePoints: settings.activePoints,
      costo: settings.costPoint,
      valuePoint: settings.valuePoint,
      activeBadges: settings.activeBadges,
      badges: settings.badges,
    })),

  adminsEmails: [],
  semiAdminsEmails: [],
  setEmailsAdmins: (emails) =>
    set(() => ({
      adminsEmails: emails.admins,
      semiAdminsEmails: emails.semiAdmins,
    })),
}));
