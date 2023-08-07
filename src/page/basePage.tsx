import { Box } from '@chakra-ui/react';
import React, { ReactNode } from 'react';

interface IBaseProps {
    className?: string;
    children: ReactNode;
}

export const BasePage: React.FC<IBaseProps> = (props: IBaseProps) => {
    return (
        <Box className={(props.className ?? '') + ' page'} draggable="false">
            {props.children}
        </Box>
    );
}

