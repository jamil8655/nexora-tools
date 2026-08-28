export interface AdConfig {
  enabled: boolean;
  provider: 'adsense' | 'admob' | 'custom';
  adsense: {
    client: string; // e.g. ca-pub-XXXXXXXXXXXXXXXX
    slots: {
      headerBanner?: string;
      inFeedCard?: string;
      toolBottom?: string;
      resultPage?: string;
    };
  };
  admob: {
    appIdAndroid?: string; // e.g. ca-app-pub-XXXXXXXXXXXXXXXX~YYYYYYYYYY
    bannerUnitIdAndroid?: string; // e.g. ca-app-pub-XXXXXXXXXXXXXXXX/ZZZZZZZZZZ
    interstitialUnitIdAndroid?: string;
    rewardedUnitIdAndroid?: string;
  };
}

export const adConfig: AdConfig = {
  enabled: true, // Set to true to display responsive ad slots
  provider: 'adsense',
  adsense: {
    client: process.env.NEXT_PUBLIC_ADSENSE_CLIENT || 'ca-pub-XXXXXXXXXXXXX',
    slots: {
      headerBanner: '1234567890',
      inFeedCard: '2345678901',
      toolBottom: '3456789012',
      resultPage: '4567890123',
    },
  },
  admob: {
    appIdAndroid: 'ca-app-pub-3940256099942544~3347511713', // Google AdMob Test App ID
    bannerUnitIdAndroid: 'ca-app-pub-3940256099942544/6300978111', // Test Banner ID
    interstitialUnitIdAndroid: 'ca-app-pub-3940256099942544/1033173712', // Test Interstitial ID
  },
};
