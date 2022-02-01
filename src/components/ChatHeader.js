import { Box, Image, Button } from '@skynexui/components';
import React from 'react';

export function ChatHeader() {
    return (
        <>
            <Box styleSheet={{ width: '100%', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} >
                <Image styleSheet={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginBottom: '20px',
                    maxWidth: '100px',
                        
                    
                }}
                    src={`https://logodownload.org/wp-content/uploads/2017/08/pokemon-logo.png`} />

                <Button
                    variant='tertiary'
                    colorVariant='neutral'
                    label='Logout'
                    href="/"
                />
            </Box>
        </>
    )
}