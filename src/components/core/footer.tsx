import React from 'react';
import packageJson from '../../../package.json';
import { ExternalUrl } from '../../constants/externalUrl';

const FooterContent: React.FC = () => {
    return (
        <p className="copyright">
            <span>Built by </span>
            <a href={ExternalUrl.assistantNMS} target="_blank" rel="noopener noreferrer">AssistantNMS</a>.<br />
            <span>Tested by </span>
            <a href={ExternalUrl.meogiYT} target="_blank" rel="noopener noreferrer">Meogi</a><span> and </span>
            <a href={ExternalUrl.nmsHubDiscord} target="_blank" rel="noopener noreferrer">NMS Hub</a>.<br /><br />
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

