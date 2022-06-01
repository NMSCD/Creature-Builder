import { Text } from '@chakra-ui/react';
import React from 'react';

export const NotFoundPage: React.FC = () => {

    if (document.querySelectorAll('div.page').length > 0) {
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

