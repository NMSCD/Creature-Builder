import React, { ReactNode, useEffect } from 'react';
import { ColorModeScript, DarkMode } from '@chakra-ui/react';
import {
  createTheme,
  ThemeProvider,
} from '@material-ui/core/styles';
import { setChakraToDarkMode } from './helper/documentHelper';

interface IProps {
  children: ReactNode;
}

export const CustomThemeProvider: React.FC<IProps> = (props: IProps) => {

  useEffect(() => {
    setChakraToDarkMode();
  }, []);

  const matTheme = createTheme({
    palette: {
      type: 'dark',
      primary: { 500: '#46a1ec' },
    },
  } as any);

  return (
    <DarkMode>
      <ThemeProvider theme={matTheme}>
        <ColorModeScript initialColorMode="dark" />
        {props.children}
      </ThemeProvider>
    </DarkMode>
  );
}

