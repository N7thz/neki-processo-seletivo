import { FC, useEffect, useRef, useState } from 'react';
import { Bell } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { NotificatioBoardProps } from '@/types';

export const NotificationsBoard: FC<NotificatioBoardProps> = ({ notifications }) => {

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
                    className="absolute top-[10%] right-[100%] z-40 border-2 flex flex-col gap-4 border-violet-500 p-4 w-[320px] h-[260px] overflow-y-scroll scrollbar-none hover:scrollbar-thin scrollbar-thumb-rounded-full
                    scrollbar-thumb-violet-500 scrollbar-track-zinc-100  dark:bg-zinc-950/95 dark:scrollbar-track-zinc-900"
                >
                    {
                        notifications.length == 0
                            ? <span>
                                Você ainda não possui notificações
                            </span>
                            : notifications
                                .slice(0)
                                .reverse()
                                .map(notification => {

                                    const { id, message } = notification

                                    return (

                                        <Card
                                            key={id}
                                            className='w-full p-3'
                                        >
                                            {message}
                                        </Card>
                                    )
                                })
                    }
                </Card>
            )}
        </div>
    );
};


