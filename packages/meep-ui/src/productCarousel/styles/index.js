import { PHONE_MEDIA } from 'constants/media';

// FOR STYLE
export const Style = mode => ({
  '.mainSlider': {
    backgroundColor: mode === 'list' ? 'transparent' : '#f9f9f9',
    border: mode === 'list' ? 'none' : 'solid 1px #e8e8e8',
  },

  '.mainSlider .slick-slide': {
    height: mode === 'list' ? '300px' : '400px',
  },

  '.navigator': {
    marginTop: mode === 'list' ? '10px' : '25px',
    marginBottom: mode === 'list' ? '10px' : '0px',
  },

  '.navigator .slick-slide': {
    opacity: 0.3,
    transition: '0.5s',
  },

  '.navigator .slick-slide.slick-current': {
    opacity: '1',
  },

  '.slick-prev, .slick-next': {
    width: '50px',
    height: '100%',
    margin: '0',
    top: '0',
    opacity: '0',
    transition: '0.5s',
    zIndex: '1',
    padding: '10px',
    color: 'rgba(255, 255, 255, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  '.slick-prev:hover, .slick-next:hover': {
    color: 'white',
  },

  '.slick-next': {
    right: '0px',
  },

  '.slick-prev': {
    left: '0px',
  },

  '.slick-slider:hover .slick-prev, .slick-slider:hover .slick-next': {
    opacity: '1',
  },

  mediaQueries: {
    [PHONE_MEDIA.substring(7)]: {
      '.mainSlider .slick-slide': {
        height: '300px',
      },
    },
  },
});

export const root = {
  width: '100%',
};

export const sliderWrapper = mode => ({
  margin: 'auto',
  maxWidth: mode === 'list' ? '300px' : '400px',
  ...(mode === 'detail'
    ? {
        padding: '60px 0',
        [PHONE_MEDIA]: {
          padding: '15px 0',
          maxWidth: '300px',
        },
      }
    : {}),
});

export const arrow = {
  fontSize: '18px',
};

export const showcase = ({ src, mode, isClear }) => ({
  backgroundImage: isClear ? `url(${src}?w=400)` : `url(${src}?w=60)`,
  backgroundSize: 'contain',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center center',
  height: mode === 'list' ? '300px' : '400px',
  filter: !isClear && 'blur(10px) brightness(80%)',
  transform: !isClear && 'scale(1.01)',
  transition: 'all 0.5s ease-in',
  [PHONE_MEDIA]: {
    height: '300px',
  },
});

export const thumbnail = (src, mode) => ({
  backgroundImage: `url(${src}?w=100)`,
  backgroundSize: 'contain',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center center',
  height: mode === 'list' ? '60px' : '100px',
  [PHONE_MEDIA]: {
    height: '60px',
  },
});
