import "dotenv/config"; // .env dosyasını yüklemek için en üste ekleyin

export default ({ config }) => {
  // config objesi, Expo'nun app.json'dan okuduğu veya varsayılan değerleri içerir.
  config.extra = {
    ...(config.extra || {}), // Eğer config içinde zaten bir 'extra' varsa onu koru
    firebaseApiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
    firebaseAuthDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
    firebaseProjectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
    firebaseStorageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
    firebaseMessagingSenderId:
      process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    firebaseAppId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
    firebaseMeasurementId: process.env.EXPO_PUBLIC_FIREBASE_MEASUREMENT_ID,
    // Eğer EAS Build kullanıyorsanız ve proje ID'niz .env dosyasındaysa:
    // eas: {
    //   projectId: process.env.EAS_PROJECT_ID || config.extra?.eas?.projectId, // Önce .env'den oku, yoksa mevcut config'den al
    // },
  };

  // app.json'daki diğer tüm değerler zaten 'config' objesinde mevcut olduğu için
  // sadece güncellenmiş 'config' objesini geri döndürmemiz yeterli.
  // Expo, bu döndürülen objeyi nihai yapılandırma olarak kullanacaktır.

  return {
    ...config, // app.json'dan gelen tüm orijinal değerleri buraya yayıyoruz
    // İsterseniz burada config içindeki diğer değerleri de dinamik olarak değiştirebilirsiniz.
    // Örneğin: version: process.env.APP_VERSION || config.version,
  };
};
