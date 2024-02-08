import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { Bell } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Notification } from '@/types';

interface DropdownMenuProps {

    notifications: Notification[]
}

export const NotificationsBoard: React.FC<DropdownMenuProps> = ({ notifications }) => {

    const dropdownRef = useRef<HTMLDivElement>(null);
    const [isActive, setIsActive] = useState<boolean>(false);

    const onClick = () => setIsActive(!isActive);

    useEffect(() => {

        const pageClickEvent = (e: MouseEvent) => {
            if (dropdownRef.current !== null && !dropdownRef.current.contains(e.target as Node)) {
                setIsActive(false);
            }
        };

        if (isActive) {
            window.addEventListener('click', pageClickEvent);
        }

        return () => {
            window.removeEventListener('click', pageClickEvent);
        };

    }, [isActive]);

    return (

        <div ref={dropdownRef}>

            <div
                onClick={onClick}
                className="w-full h-full flex items-center gap-2 p-4 text-xl rounded-md hover:text-violet-500 group cursor-pointer"
            >
                < Bell
                    className="cursor-pointer duration-100 group-hover:rotate-12"
                    size={24}
                />
                Notificações
            </div>

            {isActive && (

                <Card
                    className="absolute top-[10%] right-[100%] z-50 border-2 border-violet-500 p-4 w-[320px] h-[200px]"
                >
                    <CardContent
                        className="flex justify-center items-center"
                    >
                        {
                            notifications.length == 0
                                ? <span>
                                    Você ainda não possui notificações
                                </span>
                                : notifications.map(notification => {

                                    const { id, message } = notification

                                    return (
                                        
                                        <div

                                            key={id}
                                        >
                                            {message}
                                        </div>
                                    )
                                })
                        }
                    </CardContent>
                </Card>
            )}
        </div>
    );
};


