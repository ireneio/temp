// typescript import
import { CarouselRef } from 'antd/lib/carousel';

// import
import { useCallback } from 'react';

// definition
// FIXME: react-slick bug - miss .slick-active class on slides that are visible
// https://github.com/akiran/react-slick/issues/764
export default (bottomRef: React.RefObject<CarouselRef>): (() => void) =>
  useCallback(() => {
    const slickList =
      bottomRef?.current?.innerSlider.list.childNodes[0].childNodes;

    slickList.forEach((_: unknown, index: number) => {
      if (!/slick-active/.test(slickList[index].className)) {
        slickList[index].className += ' slick-active';
      }
    });
  }, [bottomRef]);
