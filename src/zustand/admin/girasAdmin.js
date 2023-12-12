import { create } from 'zustand';

export const useCreateOrEditGira = create((set) => ({
  id: '',
  setId: (id) => set(() => ({ id: id })),

  currentId: '',
  setCurrentId: (id) => set(() => ({ currentId: id })),

  title: '',
  setTitle: (value) => set(() => ({ title: value })),

  description: '',
  setDescription: (value) => set(() => ({ description: value })),

  city: '',
  setCity: (value) => set(() => ({ city: value })),

  country: '',
  setCountry: (value) => set(() => ({ country: value })),

  location: '',
  setLocation: (value) => set(() => ({ location: value })),

  locationUrl: '',
  setLocationUrl: (value) => set(() => ({ locationUrl: value })),

  meetingPoint: '',
  setMeetingPoint: (value) => set(() => ({ meetingPoint: value })),

  priceAdult: '',
  setPriceAdult: (number) => set(() => ({ priceAdult: Number(number) })),

  priceChild: '',
  setPriceChild: (number) => set(() => ({ priceChild: Number(number) })),

  priceBaby: '',
  setPriceBaby: (number) => set(() => ({ priceBaby: Number(number) })),

  priceInPoint: '',
  setPriceInPoint: (discount) =>
    set(() => ({ priceInPoint: Number(discount) })),

  priceAdultInPoint: '',
  setPriceAdultInPoint: (discount) =>
    set(() => ({ priceAdultInPoint: Number(discount) })),

  priceChildInPoint: '',
  setPriceChildInPoint: (discount) =>
    set(() => ({ priceChildInPoint: Number(discount) })),

  priceBabyInPoint: '',
  setPriceBabyInPoint: (discount) =>
    set(() => ({ priceBabyInPoint: Number(discount) })),

  badgesForThisGira: [],
  setBadgesForThisGira: (badges) => set(() => ({ badgesForThisGira: badges })),
  editBadgesForThisGiraDescuentos: (porcentaje, index) =>
    set((state) => {
      const newArray = [...state.badgesForThisGira];
      newArray[index].discountRate = porcentaje;
      return { badgesForThisGira: newArray };
    }),

  activePoints: false,
  setActivePoints: (checked) => set(() => ({ activePoints: checked })),
  activeDiscountWithPoints: false,
  setActiveDiscountWithPoints: (checked) =>
    set(() => ({ activeDiscountWithPoints: checked })),
  activeBadges: false,
  setActiveBadges: (checked) => set(() => ({ activeBadges: checked })),

  aboutActivity: '',
  setAboutActivity: (value) => set(() => ({ aboutActivity: value })),

  canGoChildren: true,
  setCanGoChildren: (checked) => set(() => ({ canGoChildren: checked })),

  canGoBebies: true,
  setCanGoBebies: (checked) => set(() => ({ canGoBebies: checked })),

  canCancelFree: true,
  setCanCancelFree: (checked) => set(() => ({ canCancelFree: checked })),

  instandConfirm: true,
  setInstandConfirm: (checked) => set(() => ({ instandConfirm: checked })),

  voucherMovil: true,
  setVoucherMovil: (checked) => set(() => ({ voucherMovil: checked })),

  generalData: [''],
  setGeneralData: (newArray) => set(() => ({ generalData: newArray })),
  editGeneralData: (index, value) =>
    set((state) => {
      const newArray = [...state.generalData];
      newArray[index] = value;
      return { generalData: newArray };
    }),
  decrementGeneralData: () =>
    set((state) => {
      const newArray = [...state.generalData];
      newArray.pop();
      return { generalData: newArray };
    }),
  incrementGeneralData: () =>
    set((state) => {
      const newArray = [...state.generalData];
      newArray.push('');
      return { generalData: newArray };
    }),

  includes: [''],
  setIncludes: (newArray) => set(() => ({ includes: newArray })),
  editIncludes: (index, value) =>
    set((state) => {
      const newArray = [...state.includes];
      newArray[index] = value;
      return { includes: newArray };
    }),
  decrementIncludes: () =>
    set((state) => {
      const newArray = [...state.includes];
      newArray.pop();
      return { includes: newArray };
    }),
  incrementIncludes: () =>
    set((state) => {
      const newArray = [...state.includes];
      newArray.push('');
      return { includes: newArray };
    }),

  noIncludes: [''],
  setNoIncludes: (newArray) => set(() => ({ noIncludes: newArray })),
  editNoIncludes: (index, value) =>
    set((state) => {
      const newArray = [...state.noIncludes];
      newArray[index] = value;
      return { noIncludes: newArray };
    }),
  decrementNoIncludes: () =>
    set((state) => {
      const newArray = [...state.noIncludes];
      newArray.pop();
      return { noIncludes: newArray };
    }),
  incrementNoIncludes: () =>
    set((state) => {
      const newArray = [...state.noIncludes];
      newArray.push('');
      return { noIncludes: newArray };
    }),

  utilInformation: [''],
  setUtilInformation: (newArray) => set(() => ({ utilInformation: newArray })),
  editUtilInformation: (index, value) =>
    set((state) => {
      const newArray = [...state.utilInformation];
      newArray[index] = value;
      return { utilInformation: newArray };
    }),
  decrementUtilInformation: () =>
    set((state) => {
      const newArray = [...state.utilInformation];
      newArray.pop();
      return { utilInformation: newArray };
    }),
  incrementUtilInformation: () =>
    set((state) => {
      const newArray = [...state.utilInformation];
      newArray.push('');
      return { utilInformation: newArray };
    }),

  durationDays: 0,
  setDurationDays: (value) => set(() => ({ durationDays: value })),

  durationHours: 0,
  setDurationHours: (value) => set(() => ({ durationHours: value })),

  durationMinutes: 0,
  setDurationMinutes: (value) => set(() => ({ durationMinutes: value })),

  date: '',
  setDate: (value) => set(() => ({ date: value })),
  dateDetaild: {},
  setDateDetaild: (value) => set(() => ({ dateDetaild: value })),

  dateInMilliseconds: {},
  setDateInMilliseconds: (value) => set(() => ({ dateInMilliseconds: value })),

  dateLimitForCancel: '',
  setDateLimitForCancel: (value) => set(() => ({ dateLimitForCancel: value })),

  dateLimitForCancelDetaild: {},
  setDateLimitForCancelDetaild: (value) =>
    set(() => ({ dateLimitForCancelDetaild: value })),

  dateLimitForCancelInMilliseconds: {},
  setDateLimitForCancelInMilliseconds: (value) =>
    set(() => ({ dateLimitForCancelInMilliseconds: value })),

  hour: '',
  setHour: (value) => set(() => ({ hour: value })),

  minute: '',
  setMinute: (value) => set(() => ({ minute: value })),

  amORpm: 'a. m.',
  setAmORpm: (value) => set(() => ({ amORpm: value })),

  coverImage: {},
  setCoverImage: (image) => set(() => ({ coverImage: image })),
  deleteCoverImage: () => set(() => ({ coverImage: {} })),
  coverImageId: '',
  setImageCoverId: (id) => set(() => ({ coverImageId: id })),

  images: [],
  setImages: (newImages) => set(() => ({ images: newImages })),
  addImages: (newImages) =>
    set((state) => ({ images: [...state.images, newImages] })),
  deleteImige: (indexImg) =>
    set((state) => {
      const newArray = [...state.images];
      newArray.splice(indexImg, 1);
      return { images: newArray };
    }),

  idsImages: [],
  setIdsImages: (ids) => set(() => ({ idsImages: ids })),

  idsImagesToDelete: [],
  addIdImageToDelete: (newId) =>
    set((state) => ({
      idsImagesToDelete: [...state.idsImagesToDelete, newId],
    })),

  // para manejar imagenes con ID
  imagesWithId: {},
  // setImagesWithId: (newImages) => set(() => ({ images: newImages })),
  addImageWithId: (id, link) =>
    set((state) => ({
      imagesWithId: { ...state.imagesWithId, [id]: link },
    })),
  deleteImigeWithId: (id) =>
    set((state) => {
      const newObjet = { ...state.imagesWithId };
      delete newObjet[id];
      return { imagesWithId: newObjet };
    }),

  pathsImagesOfGira: [],
  setPathsImagesOfGira: (imagesPaths) =>
    set(() => ({ pathsImagesOfGira: imagesPaths })),
  pathImagesToDelete: [],
  addPathImageToDelete: (newPathImageToDelete) =>
    set((state) => ({
      pathImagesToDelete: [...state.pathImagesToDelete, newPathImageToDelete],
    })),

  showGira: true,
  setShowGira: (checked) => set(() => ({ showGira: checked })),

  pasoFechaGira: false,
  setPasoFechaGira: (pasoFecha) => set(() => ({ pasoFechaGira: pasoFecha })),
}));

export const girasListForAdmin = create((set) => ({
  giras: [],
  setGiras: (giras) => set(() => ({ giras: giras })),
  girasDone: [],
  setGirasDone: (giras) => set(() => ({ girasDone: giras })),
  girasNoDone: [],
  setGirasNoDone: (giras) => set(() => ({ girasNoDone: giras })),
  allGiras: [],
  setAllGiras: (giras) => set(() => ({ allGiras: giras })),
  girasArchivadas: [],
  setGirasArchivadas: (giras) => set(() => ({ girasArchivadas: giras })),
  giraSelected: {},
  setGiraSelected: (newGira) => set((state) => ({ giraSelected: newGira })),
  removeGiraSelected: () => set(() => ({ giraSelected: {} })),
}));
