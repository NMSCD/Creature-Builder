import { Box, Button, Center, Input } from '@chakra-ui/react';
import React from 'react';

export const LoginPage: React.FC = () => {

    return (
        <Center className="login-page">
            <Box className="blurred-box">
                <div className="nmscd-login-box">
                    <img
                        src="https://avatars.githubusercontent.com/u/62565964?s=200"
                        alt="NMSCD"
                        className="nmscd-icon"
                    />
                    <div className="explanation">NMSCD</div>
                    <Input placeholder="Licence key" />
                    <Button mt={3} colorScheme="red">SUBMIT</Button>
                </div>
            </Box>
        </Center>
    );
}

