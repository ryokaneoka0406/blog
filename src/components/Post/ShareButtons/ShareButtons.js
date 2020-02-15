import React from 'react';
import styles from './ShareButtons.module.scss';

import {
    FacebookShareButton,
    FacebookIcon,
    TwitterShareButton,
    TwitterIcon,
} from 'react-share';


type Props = {
    shareTitle: String,
    shareUrl: String
};

const ShareButtons = ({ shareTitle, shareUrl }: Props) => (
    <div className={styles['sharebuttons']}>
        <TwitterShareButton className={styles['sharebuttons__twitter']} title={shareTitle + "\n"} via="ryopenguin" url={shareUrl}>
            <TwitterIcon size={32} round />
        </TwitterShareButton>
        <FacebookShareButton className={styles['sharebuttons__facebook']} url={shareUrl} quote={shareTitle}>
            <FacebookIcon size={32} round />
        </FacebookShareButton>
    </div>
);
export default ShareButtons;