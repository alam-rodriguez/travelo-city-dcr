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

const BadgesAndPointsOptions = () => {
  const { ask, successAlert, errorAlert, waitingAlert, warningAlert } =
    useAlerts();

  const { hasInfo } = useInfoApp();

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

  useEffect(() => {
    console.log(badges);
    console.log(badges);
    if (hasInfo) return;
    const f = async () => {
      const res = await getBadgesAndPointsOptions();
      if (res != false) {
        setSettingsBadgesAndPoints(res);
      }
      console.log(res);
    };
    f();
  }, []);

  const saveSettings = async () => {
    const want = await ask({
      title: 'Guardar cambios',
      text: 'Quieres guardar los cambio ?',
      confirmButtonText: 'Guardar cambios',
    });
    if (!want.isConfirmed) return;
    waitingAlert('Guardando cambios en base de datos...');

    const badgesAndPointsOptions = {
      costPoint: costo,
      valuePoint,
      activePoints,
      activeBadges,
      badges,
    };
    console.log(badgesAndPointsOptions);

    const res = await setBadgesAndPointsOptions(badgesAndPointsOptions);
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
      <Headers text="Insignias y puntos" link="/admin-options/opciones-app" />
      <div className="my-4">
        <Input
          id="costo-punto"
          label="Valor en puntos de cada peso:"
          type="number"
          value={costo}
          placeholder="Valor en puntos de cada peso"
          minLength={3}
          handleChange={setCostoPunto}
        />
        <Input
          id="value-points"
          label="Valor de cada punto:"
          type="number"
          value={valuePoint}
          placeholder="Valor en pesos de cada punto"
          minLength={3}
          handleChange={setValuePoint}
        />

        <div className={`form-check form-switch my-4 `}>
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
        </div>

        <hr className="border-black border-4" />

        {badges.map((badge, i) => (
          <div className="border-bottom border-secondary pb-3 mb-3" key={i}>
            <div className="d-flex align-items-center gap-3">
              <label className="m-0 fw-medium" htmlFor={`insignia-name-${i}`}>
                Nombre de la insignia:
              </label>
              <input
                id={`insignia-name-${i}`}
                className="bg-transparent text-black border rounded-3 p-1"
                placeholder="nombre insignia"
                value={badge.badge}
                onChange={(e) => editBadgeName(e.target.value, i)}
                type="text"
              />
            </div>
            <div className="d-flex align-items-center gap-3">
              <label
                className="m-0 fw-medium"
                htmlFor={`insignia-min-money-${i}`}
              >
                gasto minimo para conseguir insignia:
              </label>

              <input
                id={`insignia-min-money-${i}`}
                className="bg-transparent text-black border rounded-3 p-1"
                placeholder="gasto minimo"
                value={badge.minMoney}
                onChange={(e) => editBadgeMinMoney(Number(e.target.value), i)}
                type="number"
              />
            </div>
            <div className="d-flex align-items-center gap-3">
              <label
                className="m-0 fw-medium"
                htmlFor={`insignia-descuento-${i}`}
              >
                Porcentaje de descuento a usuarios con esta insignia:
              </label>

              <input
                id={`insignia-descuento-${i}`}
                className="bg-transparent text-black border rounded-3 p-1"
                placeholder="Porcentaje descuento"
                value={badge.discountRate}
                onChange={(e) =>
                  editBadgeDiscountRate(Number(e.target.value), i)
                }
                type="number"
              />
            </div>
          </div>
        ))}

        <div className={`form-check form-switch my-4 `}>
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
        </div>

        <div className="d-flex justify-content-center align-items-center gap-3 mb-5">
          <GrSubtractCircle className="display-3" onClick={deleteLastBadges} />
          <IoAddCircleOutline className="display-1" onClick={addBadge} />
        </div>

        <BtnAction text="Guardar configuracion" action={saveSettings} />
      </div>
    </>
  );
};

export default BadgesAndPointsOptions;
