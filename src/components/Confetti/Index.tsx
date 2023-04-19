import React from 'react';
import ConfettiCannon from 'react-native-confetti-cannon';
import {useReactiveVar} from '@apollo/client';
import {confettiPosition, showConfetti} from '../../services/GlobalVarService';

const Confetti = () => {
  const showConfettiReactive = useReactiveVar(showConfetti);
  const confettiPositionReactive = useReactiveVar(confettiPosition);
  return (
    <>
      {showConfettiReactive ? (
        <ConfettiCannon
          count={8}
          origin={confettiPositionReactive}
          autoStart={true}
          fadeOut
          fallSpeed={2000}
          colors={['blue', 'red', 'yellow']}
          explosionSpeed={800}
          autoStartDelay={0}
          onAnimationEnd={() => {
            showConfetti(false);
          }}
        />
      ) : null}
    </>
  );
};

export default Confetti;
