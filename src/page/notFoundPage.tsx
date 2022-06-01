import { Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';

export const NotFoundPage: React.FC = () => {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const handler = () => {
            const hasBaseElem = hasBasePageElem();
            setIsVisible(!hasBaseElem);
        };

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

