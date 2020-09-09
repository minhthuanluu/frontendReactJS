import { Icon, Menu } from 'antd';
import { formatMessage, getLocale, setLocale } from 'umi-plugin-react/locale';
import React from 'react';
import classNames from 'classnames';
import LogRocket from 'logrocket';
import HeaderDropdown from '../HeaderDropdown';
import styles from './index.less';
import { LOGROCKET_KEY } from '@/utils/constants';

if (LOGROCKET_KEY && LOGROCKET_KEY.length && window.location.hostname !== 'localhost') {
  LogRocket.init(LOGROCKET_KEY);
}

const SelectLang = props => {
  const { className } = props;
  const selectedLang = getLocale();

  const changeLang = ({ key }) => setLocale(key);

  const locales = ['vi-VN', 'en-US'];
  const languageLabels = {
    'vi-VN': 'Tiếng Việt',
    'en-US': 'English',
  };
  const languageIcons = {
    'vi-VN': '🇻🇳',
    'en-US': '🇺🇸',
  };
  const langMenu = (
    <Menu className={styles.menu} selectedKeys={[selectedLang]} onClick={changeLang}>
      {locales.map(locale => (
        <Menu.Item key={locale}>
          <span role="img" aria-label={languageLabels[locale]}>
            {languageIcons[locale]}
          </span>{' '}
          {languageLabels[locale]}
        </Menu.Item>
      ))}
    </Menu>
  );
  return (
    <HeaderDropdown overlay={langMenu} placement="bottomRight">
      <span className={classNames(styles.dropDown, className)}>
        <Icon
          type="global"
          title={formatMessage({
            id: 'navBar.lang',
          })}
        />
      </span>
    </HeaderDropdown>
  );
};

export default SelectLang;
