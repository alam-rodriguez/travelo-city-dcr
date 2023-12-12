import ImageCharging from '../../../charging-components/ImageCharging';
import TextCharging from '../../../charging-components/TextCharging';
import HeaderSugerencia from './HeaderSugerencia';

const SugerenciaCharging = () => {
  return (
    <div>
      <HeaderSugerencia />
      <ImageCharging mt={4} w={100} h={300} r={5} />
      <TextCharging mt={4} w={100} />
      <TextCharging mt={2} w={45} />
      <TextCharging mt={5} w={100} />
      <div className="d-flex overflow-scroll gap-3">
        <ImageCharging mt={4} w={85} h={250} r={5} />
        <ImageCharging mt={4} w={85} h={250} r={5} />
        <ImageCharging mt={4} w={85} h={250} r={5} />
        <ImageCharging mt={4} w={85} h={250} r={5} />
      </div>
      <TextCharging mt={5} w={100} />
      <TextCharging mt={5} w={47} />
      <TextCharging mt={3} w={100} />
      <TextCharging mt={2} w={100} />
      <TextCharging mt={2} w={68} />
      <TextCharging mt={5} w={47} />
      <TextCharging mt={3} w={100} />
      <TextCharging mt={2} w={100} />
      <TextCharging mt={2} w={68} />
      <TextCharging mt={5} w={47} />
      <TextCharging mt={3} w={100} />
      <TextCharging mt={2} w={100} />
      <TextCharging mt={2} w={68} />
      <TextCharging mt={5} w={47} />
      <TextCharging mt={3} w={100} />
      <TextCharging mt={2} w={100} />
      <TextCharging mt={2} w={68} />
      <TextCharging mt={5} w={47} />
      <TextCharging mt={3} w={100} />
      <TextCharging mt={2} w={100} />
      <TextCharging mt={2} w={68} />
    </div>
  );
};

export default SugerenciaCharging;
