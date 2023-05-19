import React from 'react';
import ConfettiCannon from 'react-native-confetti-cannon';
import {useReactiveVar} from '@apollo/client';
import {confettiPosition, showConfetti} from '../../services/GlobalVarService';
import { MAIN_BAD_RED } from '../../colors';

const Confetti = () => {
  const showConfettiReactive = useReactiveVar(showConfetti);
  const confettiPositionReactive = useReactiveVar(confettiPosition);
  return (
    <>
      {showConfettiReactive ? (
        <ConfettiCannon
          count={20}
          origin={confettiPositionReactive}
          autoStart={true}
          fadeOut
          fallSpeed={2000}
          colors={['#a864fd', '#29cdff', '#78ff44', '#ff718d', '#fdff6a']}
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
