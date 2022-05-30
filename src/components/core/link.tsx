import { ReactNode } from "react";
import { ExternalUrl } from "../../constants/externalUrl";

import { Site } from "../../constants/site";

interface IProps {
    id?: string;
    href: string;
    title?: string;
    onClick?: () => void;
    additionalClassNames?: string;
    children?: ReactNode;
}

export const BasicLink = (props: IProps) => {
    const appendRef = (baseUrl: string) => {
        if (baseUrl.includes('@')) return baseUrl;
        if (baseUrl.includes('?')) {
            return baseUrl + `&ref=${Site.ref}`;
        }
        return baseUrl + `?ref=${Site.ref}`;
    };

    const localClick = (e: any) => {
        if (props.onClick != null) {
            e.preventDefault();
            props.onClick();
        }
    }

    return (
        <a
            id={props.id}
            href={appendRef(props.href)}
            target="_blank"
            rel="noopener noreferrer"
            className={props.additionalClassNames ?? ''}
            onClick={localClick}
            draggable={false}>
            {props.children}
        </a>
    );
}

export const AssistantNmsHomeLink = () => (<BasicLink href={Site.assistantNMS.website} title="AssistantNMS">AssistantNMS</BasicLink>);
export const MeogiYouTubeChannel = () => (<BasicLink href={ExternalUrl.meogiYT} title="Meogi">Meogi</BasicLink>);
export const NMSHubDiscordLink = () => (<BasicLink href={ExternalUrl.nmsHubDiscord} title="NMS Hub">NMS Hub</BasicLink>);
export const GoatFungusSaveEditorLink = () => (<BasicLink href={ExternalUrl.goatFungusSaveEditor} title="goatfungus Save Editor">goatfungus Save Editor</BasicLink>);