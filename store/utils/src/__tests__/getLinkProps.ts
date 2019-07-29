// import
import getLinkProps from '../getLinkProps';

// definition
test.each`
  href                                   | expected
  ${'/'}                                 | ${{ href: '/' }}
  ${'/pages/test'}                       | ${{ href: '/pages?path=test', as: '/pages/test' }}
  ${'/checkout/thank-you-page/order-id'} | ${{ href: '/thankYouPage?orderId=order-id', as: '/checkout/thank-you-page/order-id' }}
`('test $href shoule be equal to $expected', ({ href, expected }) => {
  expect(getLinkProps(href)).toEqual(expected);
});
