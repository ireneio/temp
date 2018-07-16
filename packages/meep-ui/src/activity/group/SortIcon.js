import React from 'react';
import PropTypes from 'prop-types';
import radium from 'radium';

@radium
export default class SortIcon extends React.PureComponent {
  static propTypes = {
    sort: PropTypes.oneOf(['asc', 'desc']).isRequired,
    style: PropTypes.shape({}),
    onClick: PropTypes.func,
  };

  static defaultProps = {
    style: null,
    onClick: null,
  };

  render() {
    const { sort, style, onClick } = this.props;
    return sort === 'asc' ? (
      <svg style={style} onClick={onClick} viewBox="0 0 25 21">
        <defs>
          <path id="a" d="M.028 14.012h9.824V.071H.028z" />
          <path id="c" d="M17.078.071H.001v2.221h17.077z" />
        </defs>
        <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
          <g transform="matrix(1 0 0 -1 14.707 15.528)">
            <mask id="b" fill="#fff">
              <use xlinkHref="#a" />
            </mask>
            <path
              d="M6.127 10.23c.61-.568 1.135-1.062 1.666-1.55.413-.378.885-.483 1.4-.249.751.342.886 1.21.27 1.798-.799.764-1.614 1.511-2.422 2.265-.419.39-.832.786-1.257 1.167-.502.45-1.172.475-1.655.03a252.724 252.724 0 0 1-3.758-3.516c-.594-.569-.383-1.488.38-1.775.496-.188.944-.081 1.333.277.44.404.873.815 1.31 1.222.09.083.184.164.357.319v-.523c0-2.744-.002-5.488.001-8.233 0-.765.253-1.157.837-1.334.76-.231 1.478.27 1.534 1.072.008.115.004.231.004.346V10.23z"
              fill="#666"
              mask="url(#b)"
              transform="rotate(180 4.94 7.042)"
            />
          </g>
          <g transform="matrix(1 0 0 -1 0 20.994)">
            <mask id="d" fill="#fff">
              <use xlinkHref="#c" />
            </mask>
            <path
              d="M8.54.072c2.374 0 4.748-.003 7.123.005.247 0 .508.03.738.117.46.172.703.585.675 1.047a1.07 1.07 0 0 1-.826.98c-.207.05-.425.068-.638.068-4.71.004-9.42.005-14.132-.001-.249 0-.509-.026-.744-.103A1.064 1.064 0 0 1 .002 1.13C.024.671.34.27.82.143c.204-.054.423-.068.635-.068C3.817.07 6.178.072 8.54.072"
              fill="#666"
              mask="url(#d)"
            />
          </g>
          <path
            d="M7.049 15.456h5.685c.114 0 .228.005.34-.006.612-.059 1.063-.528 1.061-1.1-.001-.56-.428-1.003-1.037-1.076a2.573 2.573 0 0 0-.303-.012c-3.815 0-7.63.001-11.446-.003-.513 0-.956.122-1.218.611-.392.733.152 1.57 1.043 1.582 1.15.015 2.3.004 3.45.004h2.425M5.57 9.99c1.49 0 2.98.006 4.47-.003.793-.005 1.331-.713 1.094-1.419-.139-.411-.44-.65-.852-.733a2.717 2.717 0 0 0-.528-.038 7516.37 7516.37 0 0 0-8.333-.001c-.113 0-.228.002-.34.015-.646.07-1.096.538-1.08 1.117.015.591.52 1.057 1.175 1.06 1.465.006 2.93.002 4.394.002M4.138 4.536h2.687c.151-.001.304.002.453-.02.56-.082.985-.571.97-1.102-.014-.525-.43-.977-.98-1.051a4.603 4.603 0 0 0-.604-.033c-1.703-.002-3.406-.002-5.109 0-.176 0-.353.007-.528.028-.593.068-1.03.534-1.027 1.085a1.092 1.092 0 0 0 1.074 1.076c1.02.025 2.043.007 3.064.007v.01"
            fill="#666"
          />
        </g>
      </svg>
    ) : (
      <svg style={style} onClick={onClick} viewBox="0 0 25 20">
        <defs>
          <path id="a" d="M.028 14.012h9.824V.072H.028v13.94z" />
          <path id="c" d="M17.078.071H0v2.221h17.077V.072z" />
        </defs>
        <g fill="none" fillRule="evenodd">
          <g transform="translate(14.707 5.472)">
            <mask id="b" fill="#fff">
              <use xlinkHref="#a" />
            </mask>
            <path
              fill="#666"
              d="M6.127 10.23c.61-.568 1.135-1.062 1.666-1.55.413-.378.885-.483 1.4-.249.751.342.886 1.21.27 1.798-.799.764-1.614 1.511-2.422 2.265-.419.39-.832.786-1.257 1.167-.502.45-1.172.475-1.655.03a252.724 252.724 0 0 1-3.758-3.516c-.594-.569-.383-1.488.38-1.775.496-.188.944-.081 1.333.277.44.404.873.815 1.31 1.222.09.083.184.164.357.319v-.523c0-2.744-.002-5.488.001-8.233 0-.765.253-1.157.837-1.334.76-.231 1.478.27 1.534 1.072.008.115.004.231.004.346v8.684z"
              mask="url(#b)"
            />
          </g>
          <g transform="translate(0 .006)">
            <mask id="d" fill="#fff">
              <use xlinkHref="#c" />
            </mask>
            <path
              fill="#666"
              d="M8.54.072c2.374 0 4.748-.003 7.123.005.247 0 .508.03.738.117.46.172.703.585.675 1.047a1.07 1.07 0 0 1-.826.98c-.207.05-.425.068-.638.068-4.71.004-9.42.005-14.132-.001a2.42 2.42 0 0 1-.744-.103A1.064 1.064 0 0 1 .002 1.13C.024.671.34.27.82.143c.204-.054.423-.068.635-.068C3.817.07 6.178.072 8.54.072"
              mask="url(#d)"
            />
          </g>
          <path
            fill="#666"
            d="M7.049 5.544h5.685c.114 0 .228-.005.34.006.612.059 1.063.528 1.061 1.1-.001.56-.428 1.003-1.037 1.076-.1.012-.202.012-.303.012-3.815 0-7.63-.001-11.446.003-.513 0-.956-.122-1.218-.611-.392-.733.152-1.57 1.043-1.582 1.15-.015 2.3-.004 3.45-.004h2.425M5.57 11.01c1.49 0 2.98-.006 4.47.003.793.005 1.331.713 1.094 1.419-.139.411-.44.65-.852.733a2.717 2.717 0 0 1-.528.038c-2.778.003-5.555.002-8.333.001-.113 0-.228-.002-.34-.015-.646-.07-1.096-.538-1.08-1.117.015-.591.52-1.057 1.175-1.06 1.465-.006 2.93-.002 4.394-.002m-1.432 5.454h2.687c.151.001.304-.002.453.02.56.082.985.571.97 1.102-.014.525-.43.977-.98 1.051a4.52 4.52 0 0 1-.604.033c-1.703.002-3.406.002-5.109 0-.176 0-.353-.007-.528-.028-.593-.068-1.03-.534-1.027-1.085a1.092 1.092 0 0 1 1.074-1.076c1.02-.025 2.043-.007 3.064-.007v-.01"
          />
        </g>
      </svg>
    );
  }
}
