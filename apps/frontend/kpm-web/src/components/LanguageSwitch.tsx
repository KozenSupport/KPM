import { Button, Space } from 'antd';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';

function languageStorageKey(pathname: string) {
  return pathname.startsWith('/customer-login') || pathname.startsWith('/customer-portal')
    ? 'kpm.portal.language'
    : 'kpm.language';
}

export function LanguageSwitch({ compact = false }: { compact?: boolean }) {
  const { i18n } = useTranslation();
  const location = useLocation();
  const isEnglish = i18n.language.startsWith('en');
  async function toggle() {
    const next = isEnglish ? 'zh-CN' : 'en-US';
    window.localStorage.setItem(languageStorageKey(location.pathname), next);
    await i18n.changeLanguage(next);
  }
  return (
    <Button className="kpm-language-switch" size="small" onClick={toggle} data-i18n-skip="true">
      {compact ? (isEnglish ? '中' : 'EN') : <Space size={4}><span>{isEnglish ? '中文' : 'English'}</span></Space>}
    </Button>
  );
}
