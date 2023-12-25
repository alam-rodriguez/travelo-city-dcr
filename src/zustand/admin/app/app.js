import { create } from 'zustand';
import { getGira } from '../../../firebase/firestoreGiras/giras';

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

  sendEmailToAdmins: (subject, text) =>
    set((state) => {
      const admins = [...state.adminsEmails, ...state.semiAdminsEmails];
      console.log(admins);

      for (const key in admins) {
        const admin = admins[key];
        // console.log(admin);
        const response = fetch(
          'https://server-to-send-mails.vercel.app/send-email',
          {
            method: 'POST',
            mode: 'cors',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              to: admin,
              subject: subject,
              text: text,
            }),
          },
        );
        response
          .then((res) => res.json())
          .then((res2) => {
            console.log('Mensaje enviado');
          })
          .catch((e) => {
            console.log('Error');
            console.log(e);
          });
      }

      return {};
    }),

  allUser: [],
  usersCanReceiveNotisOfGiras: [],
  usersCanReceiveNotisOfSugerencias: [],
  usersCanReceiveNotisOfReservations: [],
  setUsers: (users) =>
    set(() => {
      const usersCanReceiveNotisOfGiras = [];
      const usersCanReceiveNotisOfSugerencias = [];
      const usersCanReceiveNotisOfReservations = [];
      console.log(users);
      users.forEach((user) => {
        if (user.notisGiras) usersCanReceiveNotisOfGiras.push(user);
        if (user.notisSugerencias) usersCanReceiveNotisOfSugerencias.push(user);
        if (user.notisReservations)
          usersCanReceiveNotisOfReservations.push(user);
      });
      return {
        allUser: users,
        usersCanReceiveNotisOfGiras: usersCanReceiveNotisOfGiras,
        usersCanReceiveNotisOfSugerencias: usersCanReceiveNotisOfSugerencias,
        usersCanReceiveNotisOfReservations: usersCanReceiveNotisOfReservations,
      };
    }),

  sendEmailsAboutNewGiras: (giraCurrentId) =>
    set((state) => {
      console.log(giraCurrentId);
      const emails = [...state.usersCanReceiveNotisOfGiras];
      console.log(emails);
      for (const i in emails) {
        console.log(emails[i]);
        const response = fetch(
          'https://server-to-send-mails.vercel.app/send-email',
          {
            method: 'POST',
            mode: 'cors',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              to: emails[i].email,
              subject: `Nueva gira, entra a ${state.nameAppShort} y realiza tu reservacion.`,
              text: `Link de gira: https://travelo-city-dcr.netlify.app/giras/${giraCurrentId}`,
            }),
          },
        );
        response
          .then((res) => res.json())
          .then((res2) => {
            console.log('Mensaje enviado');
          })
          .catch((e) => {
            console.log('Error');
            console.log(e);
          });
      }

      return {};
    }),

  sendEmailsAboutNewSugerencia: (sugerenciaId) =>
    set((state) => {
      const emails = [...state.usersCanReceiveNotisOfSugerencias];
      console.log(emails);
      for (const i in emails) {
        console.log(emails[i]);
        const response = fetch(
          'https://server-to-send-mails.vercel.app/send-email',
          {
            method: 'POST',
            mode: 'cors',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              to: emails[i].email,
              subject: `Nueva sugerencia, entra a ${state.nameAppShort} y lee nuestra sugerencia.`,
              text: `Link de sugerencia: https://travelo-city-dcr.netlify.app/sugerencia/${sugerenciaId}`,
            }),
          },
        );
        response
          .then((res) => res.json())
          .then((res2) => {
            console.log('Mensaje enviado');
          })
          .catch((e) => {
            console.log('Error');
            console.log(e);
          });
      }

      return {};
    }),
  emailsAboutReservationsWasSended: false,
  sendEmailsAboutReservations: (giraCurrentId, reservaciones) =>
    set(async (state) => {
      console.log(state.usersCanReceiveNotisOfReservations);
      console.log(giraCurrentId);
      console.log(reservaciones);

      const gira = await getGira(giraCurrentId);
      const fechaActual = new Date().getTime();
      let diferenciaEnMilisegundos = gira.dateInMilliseconds - fechaActual;
      let diferenciaEnDias = Math.trunc(
        diferenciaEnMilisegundos / (1000 * 60 * 60 * 24),
      );
      console.log(diferenciaEnDias);

      let email = [];
      reservaciones.forEach((reservacion) => {
        if (!email.includes(reservacion.email)) email.push(reservacion.email);
      });
      console.log(email);
      if (state.usersCanReceiveNotisOfReservations.length == 0) email = [];
      state.usersCanReceiveNotisOfReservations.forEach((user, i) => {
        if (!email.includes(user.email)) email.splice(i, 1);
      });

      console.log(email);
      for (const i in email) {
        console.log(email[i]);
        const response = fetch(
          'https://server-to-send-mails.vercel.app/send-email',
          {
            method: 'POST',
            mode: 'cors',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              to: email[i],
              subject: `Tu gira en ${state.nameAppShort} se aproxima.`,
              text:
                diferenciaEnDias > 1
                  ? `Falta ${diferenciaEnDias} dias para la gira, estas listo ?`
                  : diferenciaEnDias > 0
                  ? 'La gira es mañana, estas listo?'
                  : `La gira es hoy, a disfrutar`,
            }),
          },
        );
        response
          .then((res) => res.json())
          .then((res2) => {
            console.log('Mensaje enviado');
          })
          .catch((e) => {
            console.log('Error');
            console.log(e);
          });
      }

      alert('Emails enviados');
      return { emailsAboutReservationsWasSended: true };
    }),

  numberApp: 0,
  emailApp: '',
  banksAccounts: [{ bank: '', account: '' }],

  editNumberApp: (number) => set(() => ({ numberApp: number })),
  editEmailApp: (email) => set(() => ({ emailApp: email })),
  editBanks: (bank, i) =>
    set((state) => {
      const newArr = [...state.banksAccounts];
      newArr[i].bank = bank;
      return { banksAccounts: newArr };
    }),
  editAccounts: (account, i) =>
    set((state) => {
      const newArr = [...state.banksAccounts];
      newArr[i].account = account;
      return { banksAccounts: newArr };
    }),
  increseBanksAccounts: () =>
    set((state) => ({
      banksAccounts: [...state.banksAccounts, { bank: '', account: '' }],
    })),
  decrementBanksAccounts: () =>
    set((state) => {
      const newArr = [...state.banksAccounts];
      newArr.pop();
      return { banksAccounts: newArr };
    }),
  setContactAndAccounts: () => set(() => ({})),
  setContactAndBanksAccounts: (info) =>
    set(() => ({
      numberApp: info.numberApp,
      emailApp: info.emailApp,
      banksAccounts: info.banksAccounts,
    })),
}));
