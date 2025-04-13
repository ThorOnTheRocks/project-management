import { WhiteCard } from '../../components';
import { useBearStore } from '../../store';
import { useShallow } from 'zustand/shallow';

export const BearPage = () => {



  return (
    <>
      <h1>Contador de Osos</h1>
      <p>Manejo de estado simple de Zustand</p>
      <hr />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
        <BlackBears />
        <PolarBears />
        <PandaBears />
        <Bears />
      </div>

    </>
  );
};

export const BlackBears = () => {
  const blackBears = useBearStore((state) => state.blackBears);
  const increaseBlackBears = useBearStore((state) => state.increaseBlackBears);
  const decreaseBlackBears = useBearStore((state) => state.decreaseBlackBears);
  return (
    <WhiteCard centered>
      <h2>Osos Negros</h2>
      <div className="flex flex-col md:flex-row">
        <button onClick={() => increaseBlackBears(1)}> +1</button>
        <span className="text-3xl mx-2 lg:mx-10">{blackBears}</span>
        <button onClick={() => decreaseBlackBears(1)}>-1</button>
      </div>
    </WhiteCard>
  )
}

export const PolarBears = () => {
  const polarBears = useBearStore((state) => state.polarBears);
  const increasePolarBears = useBearStore((state) => state.increasePolarBears);
  const decreasePolarBears = useBearStore((state) => state.decreasePolarBears);
  return (
    <WhiteCard centered>
      <h2>Osos Negros</h2>
      <div className="flex flex-col md:flex-row">
        <button onClick={() => increasePolarBears(1)}> +1</button>
        <span className="text-3xl mx-2 lg:mx-10">{polarBears}</span>
        <button onClick={() => decreasePolarBears(1)}>-1</button>
      </div>
    </WhiteCard>
  )
}

export const PandaBears = () => {
  const pandaBears = useBearStore((state) => state.pandaBears);
  const increasePandaBears = useBearStore((state) => state.increasePandaBears);
  const decreasePandaBears = useBearStore((state) => state.decreasePandaBears);
  return (
    <WhiteCard centered>
      <h2>Osos Negros</h2>
      <div className="flex flex-col md:flex-row">
        <button onClick={() => increasePandaBears(1)}> +1</button>
        <span className="text-3xl mx-2 lg:mx-10">{pandaBears}</span>
        <button onClick={() => decreasePandaBears(1)}>-1</button>
      </div>
    </WhiteCard>
  )
}

export const Bears = () => {
  const bears = useBearStore(useShallow((state) => state.bears));
  const addBear = useBearStore((state) => state.addBear);
  const clearBears = useBearStore((state) => state.clearBears);
  const doNothing = useBearStore((state) => state.doNothing);

  return (
    <WhiteCard centered>
      <h2>Bears</h2>
      <div className="flex flex-col md:flex-row">
        <span className="text-3xl mx-2 lg:mx-10">{JSON.stringify(bears)}</span>
      </div>
      <button onClick={() => addBear({id: bears.length + 1, name: `Bear ${bears.length + 1}`})}>Add Bear</button>
      <button onClick={clearBears}>Clear Bears</button>
      <button onClick={doNothing}>Do Nothing</button>
    </WhiteCard>
  )
}