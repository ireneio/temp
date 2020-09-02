import { emptyFunction } from 'fbjs';

export default (customTracking, adTrack) => {
  const { status, eventLabel, eventCategory } = customTracking || {};

  if (!status) return emptyFunction;

  return () => {
    adTrack.custom(
      'meepShop_click',
      eventLabel,
      (eventCategory?.status && eventCategory?.value) || eventLabel,
    );
  };
};
