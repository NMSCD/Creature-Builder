import { Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';

export const NotFoundPage: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handler = () => {
            console.log('Check for base page elems');
            const hasBaseElem = hasBasePageElem();
            setIsVisible(!hasBaseElem);
        };

        setTimeout(() => {
            handler();
        }, 1000);

        window.addEventListener("hashchange", handler);
        return () => window.removeEventListener("hashchange", handler);
    }, [isVisible]);

    const hasBasePageElem = () => document.querySelectorAll('div.page').length > 0;

    if (isVisible === false || hasBasePageElem() === true) {
        return null;
    }

    return (
        <section className="not-found-page-content">
            <br />
            <Text fontSize={30} textAlign="center">
                The page you are looking for<br />
                does not exist 😦
            </Text>
            <br />
        </section>
    );
}

