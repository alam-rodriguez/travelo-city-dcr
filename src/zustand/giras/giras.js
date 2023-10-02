import { create } from 'zustand';

export const useGiras = create((set) => ({
  giras: [],
  setGiras: (giras) => set(() => ({ giras: giras })),
  giraSelected: {},
  setGiraSelected: (newGira) => set((state) => ({ giraSelected: newGira })),
  removeGiraSelected: () => set(() => ({ giraSelected: {} })),
}));

// export const useCountPersons = create((set) => ({
//   countPersons: 1,
//   inprementPersons: () =>
//     set((state) => ({ countPersons: state.countPersons + 1 })),
//   decrementPersons: () =>
//     set((state) => {
//       if (state.countPersons == 1) return { countPersons: state.countPersons };
//       return { countPersons: state.countPersons - 1 };
//     }),
// }));

export const useViewDescription = create((set) => ({
  viewDescription: false,
  setViewDescription: (value) => set((state) => ({ viewDescription: value })),
}));

export const useViewBtnSeleccionarEntrada = create((set) => ({
  viewBtnSeleccionarEntrada: true,
  setViewBtnSeleccionarEntrada: (value) =>
    set(() => ({ viewBtnSeleccionarEntrada: value })),
}));

export const useViewSeleccionarPersonas = create((set) => ({
  viewSeleccionarPersonas: false,
  setViewSeleccionarPersonas: (value) =>
    set((state) => ({ viewSeleccionarPersonas: value })),
  countPersons: 1,
  decrementPersons: () =>
    set((state) => {
      if (state.countPersons == 1) return { countPersons: state.countPersons };
      return { countPersons: state.countPersons - 1 };
    }),
  inprementPersons: () =>
    set((state) => ({ countPersons: state.countPersons + 1 })),
  resetPerson: () => set(() => ({ countPersons: 1 })),
  countChildren: 0,
  decrementCountChildren: () =>
    set((state) => {
      if (state.countChildren == 0)
        return { countChildren: state.countChildren };
      return { countChildren: state.countChildren - 1 };
    }),
  incrementCountChildren: () =>
    set((state) => ({ countChildren: state.countChildren + 1 })),
  resetChildren: () => set(() => ({ countChildren: 0 })),
  countBabies: 0,
  decrementCountBabies: () =>
    set((state) => {
      if (state.countBabies == 0) return { countBabies: state.countBabies };
      return { countBabies: state.countBabies - 1 };
    }),
  incrementCountBabies: () =>
    set((state) => ({ countBabies: state.countBabies + 1 })),
  resetBebies: () => set(() => ({ countBabies: 0 })),
}));

export const useInfoPeople = create((set) => ({
  // personAcountInfo: {

  // },
  nameAndSurname: '',
  number: '',
  setNameAndSurname: (value) => set((state) => ({ nameAndSurname: value })),
  setNumber: (value) => set((state) => ({ number: value })),
  adultosNames: {},
  setAdultosNames: (key, value) =>
    set((state) => ({ adultosNames: { ...state.adultosNames, [key]: value } })),
  deteleLastAdultoName: () =>
    set((state) => {
      const newObject = { ...state.adultosNames };
      const claves = Object.keys(newObject);
      if (claves.length > 0) {
        const ultimaClave = claves.pop();
        delete newObject[ultimaClave];
      }
      return { adultosNames: newObject };
    }),
  childrenNames: {},
  setChildrenNames: (key, value) =>
    set((state) => ({
      childrenNames: { ...state.childrenNames, [key]: value },
    })),
  deteleLastChildName: () =>
    set((state) => {
      const newObject = { ...state.childrenNames };
      const claves = Object.keys(newObject);
      if (claves.length > 0) {
        const ultimaClave = claves.pop();
        delete newObject[ultimaClave];
      }
      return { childrenNames: newObject };
    }),
  bebiesNames: {},
  setBebiesNames: (key, value) =>
    set((state) => ({ bebiesNames: { ...state.bebiesNames, [key]: value } })),
  deteleLastBebeName: () =>
    set((state) => {
      const newObject = { ...state.bebiesNames };
      const claves = Object.keys(newObject);
      if (claves.length > 0) {
        const ultimaClave = claves.pop();
        delete newObject[ultimaClave];
      }
      return { bebiesNames: newObject };
    }),
  resetNames: () =>
    set(() => ({
      adultosNames: {},
      childrenNames: {},
      bebiesNames: {},
    })),
}));

export const useImages = create((set) => ({
  images: {},
  addImage: (giraId, imageId, imgUrl) =>
    set((state) => ({
      images: {
        ...state.images,
        [giraId]: { ...state.images[giraId], [imageId]: imgUrl },
      },
    })),
}));

// import img from '../../assets/images/imgSantoDomingo.jpeg';

// const giras = [
//   {
//     id: 1,
//     images: [img, img, img, img, img, img, img],
//     title: 'Dusseldorf Dusseldorf',
//     description: 'Dusseldorf: crucero turistico por la Ciudad el Rin',
//     city: 'Santo domingo',
//     country: 'Republica Dominicana',
//     hasVotes: true,
//     HasVoucherMovil: true,
//     location: 'Agua splash',
//     locationUrl:
//       'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3782.3493792998406!2d-69.70208962567658!3d18.558280982542573!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8eaf8244725a6e4d%3A0x758a34e58d802ccd!2sPizza%20mia.%20Suc%2C%20guerra.!5e0!3m2!1ses!2sdo!4v1694629692218!5m2!1ses!2sdo',
//     rate: 4.0,
//     votes: 255,
//     canCancelFree: true,
//     instandConformation: true,
//     // giraUrl: '',
//     // giraUbication: 'Lorem ipsum dolor sit amet consectetur adipisicing.',
//     aboutActivity:
//       'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cupiditate minus ipsum quod earum optio rem dignissimos ea, quibusdam placeat ex autem? Praesentium, velit! Voluptate, cumque quod. Corrupti nostrum accusantium eos! Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cupiditate minus ipsum quod earum optio rem dignissimos ea, quibusdam placeat ex autem? Praesentium, velit! Voluptate, cumque quod. Corrupti nostrum accusantium eos! Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cupiditate minus ipsum quod earum optio rem dignissimos ea, quibusdam placeat ex autem? Praesentium, velit! Voluptate, cumque quod. Corrupti nostrum accusantium eos! ',
//     generalData: [
//       'Lorem ipsum dolor sit amet consectetur adipisicing elit, consectetur adipisicing elit.',
//       'Lorem ipsum dolor sit amet consectetur adipisicing elit, consectetur adipisicing elit.',
//       'Lorem ipsum dolor sit amet consectetur adipisicing elit, consectetur adipisicing elit.',
//       'Lorem ipsum dolor sit amet consectetur adipisicing elit, consectetur adipisicing elit.',
//       'Lorem ipsum dolor sit amet consectetur adipisicing elit, consectetur adipisicing elit.',
//       'Lorem ipsum dolor sit amet consectetur adipisicing elit, consectetur adipisicing elit.',
//     ],
//     meetingPoint:
//       'Lorem ipsum dolor sit amet consectetur adipisicing, Lorem ipsum dolor sit amet consectetur adipisicing.',
//     duration: '2 hrs 30 mins',
//     canGo: {
//       adults: true,
//       children: true,
//       babies: true,
//     },
//     prices: {
//       adult: 16,
//       child: 8,
//       baby: 0,
//     },
//     includes: [
//       'Crucero turistico',
//       'Comentarios por altavoz en ingles y aleman',
//     ],
//     noIncludes: [
//       'Crucero turistico hola',
//       'Comentarios por altavoz en ingles y aleman',
//     ],
//     utilInformation: [
//       'No apto para: niños menores de 18 años',
//       'Es obligatorio llevar mascara',
//     ],
//     // giraFecha: {
//     //   dia: 20,
//     //   mes: 12,
//     //   year: 2023,
//     //   hora: '7:30',
//     //   AmOrPm: 'a. m.',
//     // },
//     durationDetaild: {
//       days: 1,
//       hours: 1,
//       minutes: 1,
//     },
//     date: 'viernes 22 de septiembre del 2023',
//     dateDetaild: '20-12-2023',

//     hourDetaild: {
//       amORpm: 'p. m.',
//       hour: '6',
//       minute: '30',
//     },
//     // hora: {
//     //   hora: 7,
//     //   minuto: '30',
//     //   amORpm: 'p. m.',
//     // },
//     dateLimitForCancel: 'viernes 22 de septiembre del 2023',
//     dateLimitForCancelDetaild: '20-12-2023',
//   },
// ];
