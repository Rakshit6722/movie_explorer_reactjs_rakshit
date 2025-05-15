import React from 'react';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';

type LetterAvatarsProps = {
    firstLetter: string;
}

export default function LetterAvatars({ firstLetter }: LetterAvatarsProps) {
    return (
        <Stack direction="row" spacing={2}>
            <div className="relative flex items-center justify-center">
                <span
                    className="absolute w-11 h-11 rounded-full"
                    style={{
                        boxShadow: '0 0 16px 4px #e23145aa, 0 0 2px 0 #fbbf24aa',
                        zIndex: 1,
                    }}
                />
                <Avatar
                    sx={{
                        width: 32,
                        height: 32,
                        fontSize: 16,
                        backgroundColor: "#e23145",
                        zIndex: 10,
                        boxShadow: '0 2px 8px 0 rgba(226,49,69,0.15)'
                    }}
                >
                    <span style={{
                        fontFamily: 'Anton, sans-serif',
                    }}>{firstLetter.toUpperCase()}</span>
                </Avatar>
            </div>
        </Stack>

    );
}