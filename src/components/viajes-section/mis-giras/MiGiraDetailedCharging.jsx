import TextCharging from '../../charging-components/TextCharging';

const MiGiraDetailedCharging = () => {
  return (
    <>
      <div className="pt-4">
        <div
          className=" mt-4- w-50 mx-auto"
          style={{ height: 20, background: 'gray' }}
        ></div>

        <div className="d-flex justify-content-between- mt-5">
          <div className="bg-warning- w-50">
            <TextCharging mt={0} w={50} />
            <TextCharging mt={4} w={55} />
            <TextCharging mt={4} w={70} />
            <TextCharging mt={4} w={75} />
            <TextCharging mt={4} w={80} />
            <TextCharging mt={4} w={75} />
            <TextCharging mt={4} w={60} />
            <TextCharging mt={4} w={50} />
            <TextCharging mt={4} w={45} />
          </div>
          <div className="bg-dark- w-50 d-flex flex-column align-items-end">
            <TextCharging mt={0} w={50} />
            <TextCharging mt={4} w={50} />
            <TextCharging mt={4} w={45} />
            <TextCharging mt={4} w={40} />
            <TextCharging mt={4} w={45} />
            <TextCharging mt={4} w={45} />
            <TextCharging mt={4} w={50} />
            <TextCharging mt={4} w={50} />
            <TextCharging mt={4} w={55} />
          </div>
        </div>

        <hr />

        <div className="d-flex justify-content-between- mt-5-">
          <div className="bg-warning- w-50">
            <TextCharging mt={0} w={25} />
          </div>
          <div className="bg-dark- w-50 d-flex flex-column align-items-end">
            <TextCharging mt={0} w={25} />
          </div>
        </div>
        <div className="mt-5 pt-5">
          <TextCharging mt={0} center={true} w={40} />

          <TextCharging mt={4} w={100} />
          <TextCharging mt={2} w={100} />
          <TextCharging mt={2} w={75} />
        </div>
      </div>
    </>
  );
};

export default MiGiraDetailedCharging;
