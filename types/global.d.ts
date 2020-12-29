declare interface Window {
  events: EventTarget;
  FB: {
    XFBML: {
      parse: (dom: HTMLElement) => void;
    };
  };
  fbq: (eventName: string, type: string, option?: {}) => void;
  gtag: (eventName: string, type: string, option?: {}) => void;
  grecaptcha: {
    render: (dom: HTMLElement, options: { sitekey: string }) => void;
    getResponse: () => string;
    reset: () => void;
  };
  TPDirect: {
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
}
