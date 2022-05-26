import React from 'react';
import packageJson from '../../../package.json';
import { ExternalUrl } from '../../constants/externalUrl';

const FooterContent: React.FC = () => {
    return (
        <p className="copyright">
            <span>Built for the </span>
            <a href={ExternalUrl.nmsHubDiscord} target="_blank" rel="noopener noreferrer">NMS Hub</a><span> by </span>
            <a href={ExternalUrl.assistantNMS} target="_blank" rel="noopener noreferrer">AssistantNMS</a><br />
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

