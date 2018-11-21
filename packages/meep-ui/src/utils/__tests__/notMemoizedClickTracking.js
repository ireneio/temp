import notMemoizedClickTracking from '../notMemoizedClickTracking';

describe('not memoized click tracking', () => {
  test.each`
    status   | eventLabel       | eventCategory                                | fbq              | gtag
    ${false} | ${null}          | ${null}                                      | ${false}         | ${false}
    ${true}  | ${null}          | ${null}                                      | ${false}         | ${false}
    ${true}  | ${'event label'} | ${null}                                      | ${'event label'} | ${'event label'}
    ${true}  | ${'event label'} | ${{ status: true, value: 'event category' }} | ${'event label'} | ${'event category'}
  `(
    'status = $status, eventLabel = $eventLabel, eventCategory = $eventCategory',
    ({ status, eventLabel, eventCategory, fbq, gtag }) => {
      const mockFbq = jest.fn();
      const mockGtag = jest.fn();

      if (fbq) window.fbq = mockFbq;

      if (gtag) window.gtag = mockGtag;

      notMemoizedClickTracking(
        !status && !eventLabel && !eventCategory
          ? null
          : {
              status,
              eventLabel,
              eventCategory,
            },
      )();

      if (fbq) {
        expect(mockFbq).toHaveBeenCalledTimes(1);
        expect(mockFbq).toHaveBeenCalledWith('track', fbq);
      } else expect(mockFbq).toHaveBeenCalledTimes(0);

      if (gtag) {
        expect(mockGtag).toHaveBeenCalledTimes(1);
        expect(mockGtag).toHaveBeenCalledWith('event', 'meepShop_click', {
          event_label: eventLabel,
          event_category: gtag,
        });
      } else expect(mockGtag).toHaveBeenCalledTimes(0);
    },
  );
});
