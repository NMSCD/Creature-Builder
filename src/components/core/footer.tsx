import React from 'react';
import packageJson from '../../../package.json';

export const Footer: React.FC = () => {
    return (
        <footer className="noselect" draggable="false">
            <hr />
            <p className="copyright">Built for the <a href="https://discord.gg/5hrYrjtWQg">NMS Hub</a> by <a href="https://nmsassistant.com">AssistantNMS</a><br />v {packageJson.version}</p>
        </footer>
    );
}

