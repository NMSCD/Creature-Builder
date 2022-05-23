import React from 'react';

export const Header: React.FC = () => {
    return (
        <header className="noselect" draggable="false">
            <img src="./assets/img/banner.svg" alt="banner" draggable="false" style={{ margin: '0 auto' }} />
        </header>
    );
}

