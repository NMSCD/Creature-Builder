import React from 'react';
import packageJson from '../../../package.json';
import { AssistantNmsHomeLink, MeogiYouTubeChannel, NMSHubDiscordLink } from '../core/link';

const FooterContent: React.FC = () => {
    return (
        <p className="copyright">
            <span>Built by </span>
            <AssistantNmsHomeLink />.<br />
            <span>Tested by </span>
            <MeogiYouTubeChannel /><span> and </span>
            <NMSHubDiscordLink />.<br /><br />
            <span>v {packageJson.version}</span>
        </p>
    );
}

export interface IFooterProps {
    className?: string;
}
export const Footer: React.FC<IFooterProps> = (props: IFooterProps) => {
    return (
        <footer className={props.className}>
            <hr />
            <FooterContent />
        </footer>
    );
}

