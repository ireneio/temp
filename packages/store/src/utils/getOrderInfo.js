import getConfig from 'next/config';

const {
  publicRuntimeConfig: { API_HOST },
} = getConfig();

export default async (shipmentTemplate, tradeNo) => {
  const res = await fetch(
    `${API_HOST}/external/${shipmentTemplate}/getInfo/${tradeNo}`,
  );

  /* api server removes form info in 10 secends */
  if (res.status === 204) {
    return null;
  }

  if (res.status < 400) {
    const { info, CVSAddress, CVSStoreID, CVSStoreName } = await res.json();
    return {
      info,
      CVSAddress,
      CVSStoreID,
      CVSStoreName,
    };
  }
  return null;
};
