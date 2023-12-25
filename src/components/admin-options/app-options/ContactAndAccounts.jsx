import React, { useEffect } from 'react';

// Icons
import { GrSubtractCircle } from 'react-icons/gr';
import { IoAddCircleOutline } from 'react-icons/io5';

// Firebase
import {
  getBadgesAndPointsOptions,
  setBadgesAndPointsOptions,
} from '../../../firebase/admin-option/app-options/pointsSettings';

// Zustand
import { useInfoApp } from '../../../zustand/admin/app/app';

// Components
import Headers from '../../admin-options/admin-options-components/Headers';
import Input from '../admin-options-components/insputs/Input';
import BtnAction from '../admin-options-components/insputs/BtnAction';
import { useAlerts } from '../../../zustand/alerts/alerts';
import { setContactAndBanksAccounts } from '../../../firebase/admin-option/app-options/contactAndBanksAccounts';

const ContactAndAccounts = () => {
  const { ask, successAlert, errorAlert, waitingAlert, warningAlert } =
    useAlerts();

  // useEffect(() => {
  //   console.log(badges);
  //   if (hasInfo) return;
  //   const f = async () => {
  //     const res = await getBadgesAndPointsOptions();
  //     if (res != false) {
  //       setSettingsBadgesAndPoints(res);
  //     }
  //     console.log(res);
  //   };
  //   f();
  // }, []);

  const { hasInfo } = useInfoApp();

  const {
    numberApp,
    emailApp,
    banksAccounts,
    editNumberApp,
    editEmailApp,

    editBanks,
    editAccounts,

    increseBanksAccounts,
    decrementBanksAccounts,
  } = useInfoApp();

  const {
    activePoints,
    setActivePoints,
    costo,
    setCostoPunto,
    valuePoint,
    setValuePoint,
  } = useInfoApp();
  const {
    activeBadges,
    setActiveBadges,
    badges,
    addBadge,
    deleteLastBadges,
    editBadgeName,
    editBadgeMinMoney,
    editBadgeDiscountRate,

    setSettingsBadgesAndPoints,
  } = useInfoApp();

  const saveSettings = async () => {
    console.log(numberApp);
    console.log(emailApp);
    console.log(banksAccounts);
    // return;
    const want = await ask({
      title: 'Guardar cambios',
      text: 'Quieres guardar los cambio ?',
      confirmButtonText: 'Guardar cambios',
    });
    if (!want.isConfirmed) return;
    waitingAlert('Guardando cambios en base de datos...');

    const contactAndBanksAccounts = {
      numberApp,
      emailApp,
      banksAccounts,
    };
    // console.log(badgesAndPointsOptions);
    const res = await setContactAndBanksAccounts(contactAndBanksAccounts);
    if (res)
      successAlert(
        'Configuracion guardada',
        'Configuracion guardada en base de datos correctamente',
      );
    else
      errorAlert(
        'Error',
        'Ha ocurrido un error al intentar guardar los cambios, intentalo de nuevo.',
      );
  };

  return (
    <>
      <Headers
        text="Contact y cuentas bancarias"
        link="/admin-options/opciones-app"
      />
      <div className="my-4">
        <Input
          id="number"
          label="Numero:"
          type="number"
          value={numberApp}
          placeholder="8093198834"
          minLength={3}
          handleChange={editNumberApp}
        />
        <Input
          id="email"
          label="Email:"
          type="email"
          value={emailApp}
          placeholder="miemail@gmail.com"
          minLength={3}
          handleChange={editEmailApp}
        />

        {/* <div className={`form-check form-switch my-4 `}>
          <label className="form-check-label" htmlFor="switch-puntos">
            Activar generador de puntos y usar puntos
          </label>
          <input
            id="switch-puntos"
            checked={activePoints}
            className="form-check-input"
            type="checkbox"
            role="switch"
            onChange={(e) => setActivePoints(e.target.checked)}
          />
        </div> */}

        <hr className="border-black border-4" />

        {banksAccounts.map((bankAccount, i) => (
          <div className="border-bottom border-secondary pb-3 mb-3" key={i}>
            <div className="d-flex align-items-center gap-3">
              <label className="m-0 fw-medium" htmlFor={`insignia-name-${i}`}>
                Nombre de banco:
              </label>
              <input
                id={`insignia-name-${i}`}
                className="bg-transparent text-black border rounded-3 p-1"
                placeholder="nombre de banco"
                value={bankAccount.bank}
                onChange={(e) => editBanks(e.target.value, i)}
                type="text"
              />
            </div>
            <div className="d-flex align-items-center gap-3">
              <label
                className="m-0 fw-medium"
                htmlFor={`insignia-min-money-${i}`}
              >
                Numero de cuenta:
              </label>

              <input
                id={`insignia-min-money-${i}`}
                className="bg-transparent text-black border rounded-3 p-1"
                placeholder="000000000000000000"
                value={bankAccount.account}
                onChange={(e) => editAccounts(Number(e.target.value), i)}
                type="number"
              />
            </div>
          </div>
        ))}

        {/* <div className={`form-check form-switch my-4 `}>
          <label className="form-check-label" htmlFor="switch-badges">
            Activar ventajas de insignias
          </label>
          <input
            id="switch-badges"
            checked={activeBadges}
            className="form-check-input"
            type="checkbox"
            role="switch"
            onChange={(e) => setActiveBadges(e.target.checked)}
          />
        </div> */}

        <div className="d-flex justify-content-center align-items-center gap-3 mb-5">
          <GrSubtractCircle
            className="display-3"
            onClick={decrementBanksAccounts}
          />
          <IoAddCircleOutline
            className="display-1"
            onClick={increseBanksAccounts}
          />
        </div>

        <BtnAction text="Guardar configuracion" action={saveSettings} />
      </div>
    </>
  );
};

export default ContactAndAccounts;
