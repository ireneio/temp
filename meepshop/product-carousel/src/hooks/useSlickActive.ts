// import
import { useCallback } from 'react';
import { Carousel } from 'antd';

// definition
// FIXME: react-slick bug - miss .slick-active class on slides that are visible
// https://github.com/akiran/react-slick/issues/764
export default (bottomRef: React.RefObject<Carousel>): (() => void) =>
  useCallback(() => {
    const slickList =
      bottomRef?.current?.innerSlider.list.childNodes[0].childNodes;

    slickList.forEach((_: unknown, index: number) => {
      if (!/slick-active/.test(slickList[index].className)) {
        slickList[index].className += ' slick-active';
      }
    });
  }, [bottomRef]);
