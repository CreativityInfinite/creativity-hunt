export async function getMessages(locale: string) {
  try {
    if (locale === 'zh-CN') return (await import('@i18n/locales/zh-CN.json')).default;
    if (locale === 'zh-TW') return (await import('@i18n/locales/zh-TW.json')).default;
    if (locale === 'en') return (await import('@i18n/locales/en.json')).default;
    return null;
  } catch {
    return null;
  }
}
