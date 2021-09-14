export default customTracking =>
  !customTracking || !customTracking.status
    ? null
    : {
        name: customTracking.eventLabel || 'meepShop_click',
        category:
          !customTracking.eventCategory || !customTracking.eventCategory.status
            ? null
            : customTracking.eventCategory.value,
      };
