import React, { FC } from 'react'

import { Alert, AlertDescription, AlertTitle } from './ui/alert'
import { twMerge } from 'tailwind-merge'
import { AlertBoxProps } from '@/types'

export const AlertBox: FC<AlertBoxProps> = ({
    title, message, children, className
}) => {

    return (

        <Alert
            className='absolute top-[8%] z-50 w-[400px] border border-violet-500 animate-jump-in animate-once animate-ease-out'
        >
            <AlertTitle
                className={twMerge(
                    'text-2xl capitalize flex justify-center items-center gap-2',
                    className
                )}
            >
                {children}
                {title}
            </AlertTitle>
            <AlertDescription
                className='text-zinc-400 pl-4 flex justify-center'
            >
                {message}
            </AlertDescription>
        </Alert>
    )
}
