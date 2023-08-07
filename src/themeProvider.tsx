import { ChakraProvider, ColorModeScript, DarkMode } from '@chakra-ui/react';
import React, { ReactNode, useEffect } from 'react';
import { setChakraToDarkMode } from './helper/documentHelper';

interface IProps {
  children: ReactNode;
}

export const CustomThemeProvider: React.FC<IProps> = (props: IProps) => {

  useEffect(() => {
    setChakraToDarkMode();
  }, []);

  return (
    <ChakraProvider>
      <DarkMode>
        <ColorModeScript initialColorMode="dark" />
        {props.children}
      </DarkMode>
    </ChakraProvider>
  );
}
