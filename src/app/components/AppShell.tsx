import { Download, Home, Languages, Moon, ShieldCheck, Sun } from 'lucide-react';
import type { PropsWithChildren } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import type { Locale } from '../models';
import { useInstallPrompt } from '../hooks/useInstallPrompt';
import { useTheme } from '../hooks/useTheme';

export function AppShell({ children }: PropsWithChildren) {
  const { t, i18n } = useTranslation();
  const { theme, toggleTheme } = useTheme();
  const { canInstall, install } = useInstallPrompt();

  const setLanguage = async (locale: Locale) => {
    localStorage.setItem('selfassessment.language', locale);
    document.documentElement.lang = locale;
    await i18n.changeLanguage(locale);
  };

  return (
    <div className="app-shell">
      <header className="topbar">
        <NavLink className="brand" to="/">
          <span className="brand-mark">
            <ShieldCheck size={21} />
          </span>
          <span>
            <strong>{t('app.name')}</strong>
            <small>{t('app.tagline')}</small>
          </span>
        </NavLink>

        <nav className="topbar-actions" aria-label="Primary">
          <NavLink className="icon-button nav-home" to="/" title={t('nav.home')}>
            <Home size={18} />
            <span>{t('nav.home')}</span>
          </NavLink>

          {canInstall && (
            <button className="icon-button" onClick={() => void install()}>
              <Download size={18} />
              <span>{t('actions.install')}</span>
            </button>
          )}

          <label className="select-control" title="Language">
            <Languages size={17} />
            <select
              value={i18n.language.startsWith('en') ? 'en' : 'it'}
              onChange={(event) => void setLanguage(event.target.value as Locale)}
            >
              <option value="it">{t('language.it')}</option>
              <option value="en">{t('language.en')}</option>
            </select>
          </label>

          <button
            className="icon-button compact"
            onClick={toggleTheme}
            title={theme === 'dark' ? t('theme.light') : t('theme.dark')}
            aria-label={theme === 'dark' ? t('theme.light') : t('theme.dark')}
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </nav>
      </header>
      <main>{children}</main>
    </div>
  );
}
