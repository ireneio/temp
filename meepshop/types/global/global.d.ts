declare interface ECP {
  initialize: (
    serverType: string,
    isLoading: number,
    callBack: (error: string) => void,
  ) => void;
  createPayment: (
    token: string,
    language: string,
    callBack: (error: string) => void,
  ) => void;
  getPayToken: (
    callBack: (
      paymentInfo: { PayToken: string; PaymentType: string },
      error: string,
    ) => void,
  ) => void;
  ServerType: {
    Prod: string;
    Stage: string;
  };
  Language: {
    zhTW: string;
    enUS: string;
  };
}

declare interface Window {
  storePreviousPageUrl?: string;
  fbq?: (
    eventName: string,
    type: string,
    option?: {
      content_ids?: string[];
      content_type?: string;
      content_name?: string;
      search_string?: string;
      value?: number | string;
      currency?: string;
    },
    otherOption?: {
      eventID?: string;
      externalID?: string;
    },
  ) => void;
  gtag?: (eventName: string, type: string, option?: {}) => void;
  grecaptcha?: {
    ready: (readyFunc: () => void) => void;
    render: (dom: HTMLElement, options: { sitekey: string }) => void;
    getResponse: () => string;
    reset: () => void;
  };
  TPDirect?: {
    setupSDK: (appID: string, appKey: string, serverType: string) => void;
    card: {
      setup: (options: { fields: object; styles: object }) => void;
      onUpdate: (
        update: (result: {
          canGetPrime: boolean;
          cardType: string;
          status: {
            number: number;
            expiry: number;
            ccv: number;
          };
        }) => void,
      ) => void;
      getPrime: (
        update: (result: { status: number; card: { prime: string } }) => void,
      ) => void;
    };
  };
  ECPay?: {
    initialize: (
      serverType: string,
      isLoading: number,
      callBack: (error: string) => void,
    ) => void;
    createPayment: (
      token: string,
      language: string,
      callBack: (error: string) => void,
    ) => void;
    getPayToken: (
      callBack: (
        paymentInfo: { PayToken: string; PaymentType: string },
        error: string,
      ) => void,
    ) => void;
    ServerType: {
      Prod: string;
      Stage: string;
    };
    Language: {
      zhTW: string;
      enUS: string;
    };
  };
  ECP?: {
    new (): ECP;
  };
}
