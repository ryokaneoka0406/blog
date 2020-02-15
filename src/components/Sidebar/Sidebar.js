// @flow strict
import React from 'react';
import Author from './Author';
import Contacts from './Contacts';
import Copyright from './Copyright';
import Menu from './Menu';
import Adsense from 'react-adsense'
import styles from './Sidebar.module.scss';
import { useSiteMetadata } from '../../hooks';

type Props = {
  isIndex?: boolean,
};

const Sidebar = ({ isIndex }: Props) => {
  const { author, copyright, menu } = useSiteMetadata();

  return (
    <div className={styles['sidebar']}>
      <div className={styles['sidebar__inner']}>
        <Author author={author} isIndex={isIndex} />
        <Menu menu={menu} />
        <Contacts contacts={author.contacts} />
        <Copyright copyright={copyright} />
        <script data-ad-client="ca-pub-9091964379423884" async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
        <Adsense.Google
          // 払い出されたcaから始まるコードに置き換える
          client='ca-pub-9091964379423884'
          // 広告スロットはまだ作成してないので、空欄でOK
          slot=''
        />
      </div>
    </div>
  );
};

export default Sidebar;
