import React from 'react';

export const Header: React.FC = () => {
    return (
        <header className="noselect" draggable="false">
            <picture draggable="false" >
                <source srcSet="./assets/img/banner.svg" media="(min-width: 650px)" />
                <img src="./assets/img/banner-small.png" alt="banner" draggable="false" style={{ margin: '0 auto', padding: '0 3em' }} />
            </picture>
        </header>
    );
}

