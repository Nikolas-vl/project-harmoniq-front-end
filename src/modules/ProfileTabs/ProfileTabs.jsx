import React from 'react';
import styles from './styles.module.css';
import { TABS } from '../../constants/profilePage';

export const ProfileTabs = ({ setActiveTab, activeTab }) => {
  return (
    <div className={styles['author-profile__tabs']}>
      <button
        className={`${styles['author-profile__tab-btn']} ${
          activeTab === TABS.all ? styles['active'] : ''
        }`}
        onClick={() => setActiveTab(TABS.all)}
        disabled={activeTab === TABS.all}
      >
        My Articles
      </button>
      <button
        className={`${styles['author-profile__tab-btn']} ${
          activeTab === TABS.saved ? styles['active'] : ''
        }`}
        onClick={() => setActiveTab(TABS.saved)}
        disabled={activeTab === TABS.saved}
      >
        Saved Articles
      </button>
    </div>
  );
};
