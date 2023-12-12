// Icon
import { HiOutlineHeart } from 'react-icons/hi';

const GiraItemChargin = () => {
  return (
    <div
      className="bg-dark-subtle rounded-4 overflow-hidden border position-relative my-2 shadow overflow-y-scroll"
      style={{ width: '48%', height: 390 }}
    >
      <div
        className="w-100"
        style={{ height: '37%', background: 'gray' }}
      ></div>
      <div className="m-2">
        <div
          className="position-absolute bg-white rounded-circle d-flex justify-content-center align-items-center"
          style={{ top: 10, right: 10, height: 30, width: 30 }}
        >
          <HiOutlineHeart className="fs-3" />
        </div>
        <div className=" w-50" style={{ height: 20, background: 'gray' }}></div>
        <div
          className=" w-75 mt-2"
          style={{ height: 20, background: 'gray' }}
        ></div>

        <div className="position-absolute" style={{ bottom: 15 }}>
          <p className="m-0 fw-bold fs-1" style={{ color: 'gray' }}>
            $0000
          </p>
        </div>
      </div>
    </div>
  );
};

export default GiraItemChargin;
