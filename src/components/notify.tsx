"use client";
import React from 'react';
import { Button, Progress } from '@heroui/react';
import { Icon } from '@phosphor-icons/react';
import { createRoot } from 'react-dom/client';
import clsx from 'clsx';

type NotifyAlignment = "left" | "right";

interface NotifyProps {
    children: React.ReactNode;
    alignment: NotifyAlignment;
    timeout?: number;
    onPress?: () => void;
    onRemove?: () => void;
    onTimedOut?: () => void;
}

function Notify(props: NotifyProps) {
    const [isActive, setIsActive] = React.useState(true);
    const [isFocus, setIsFocus] = React.useState(false);
    const [remaningTime, setRemainingTime] = React.useState<number>(props.timeout || 0);
    const percentages = React.useMemo(() => props.timeout ? (remaningTime / props.timeout) * 100 : 100, [remaningTime]);
    
    const _this = React.useRef<HTMLDivElement>(null);
    const _wrapper = React.useRef<HTMLDivElement>(null);
    const _notify = React.useRef<HTMLAnchorElement>(null);
    
    let timeoutInterval: NodeJS.Timeout | undefined;

    const destroyNotify = () => {
        setIsActive(false);
        if (timeoutInterval) clearInterval(timeoutInterval);
        setTimeout(() => {
            if (_this.current) _this.current.remove();
            if (props.onRemove) props.onRemove();
        }, 320);
    }

    React.useEffect(() => {
        setTimeout(() => {
            if ( _this.current && _notify.current )
            {
                _this.current.classList.add("notify-highlight");
                _notify.current.classList.add("notify-highlight");
                if ( props.timeout )
                {
                    setRemainingTime(props.timeout - 1000);
                    timeoutInterval = setInterval(() => {
                        setRemainingTime(prev => prev - 1000);
                    }, 1000);
                }
                setTimeout(() => {
                    if ( _this.current && _notify.current )
                    {
                        _this.current.classList.remove("notify-highlight");
                        _notify.current.classList.remove("notify-highlight");
                    }
                    if (props.onTimedOut) props.onTimedOut();
                    if (props.timeout) destroyNotify();
                }, props.timeout ? props.timeout : 2400);
            }
        }, 20);
    }, [_notify]);

    return (
        <div className={clsx(
            "notify-base",
            isActive ? "" : "notify-hide",
            isFocus ? "notify-focused" : ""
        )} ref={_this}>
            <Button className='trigger-only' disableRipple onPress={()=>{
                if (props.onPress) props.onPress();
                destroyNotify();
            }} tabIndex={-1}>
                <div className={clsx(
                    "notify-wrapper",
                    isActive ? "" : "notify-hide",
                    isFocus ? "notify-focused" : ""
                )} tabIndex={0}
                    onFocus={()=>{
                        setIsFocus(true);
                    }} onBlur={()=>{
                        setIsFocus(false);
                    }}
                    ref={_wrapper}
                >
                    <a ref={_notify} className={clsx(
                        `notify notify-${props.alignment} animation-wrapper `,
                        isActive ? "notify-active" : "notify-hide",
                        isFocus ? "notify-focused" : ""
                    )} tabIndex={-1}>
                        <div className="animation-container">
                            <div className="osu-animate-background"></div>
                        </div>
                        {props.children}
                        {
                            props.timeout &&
                            <div className='notify-progress-bar' style={{"--progress": `${percentages}%`} as React.CSSProperties} />
                        }
                    </a>
                </div>
            </Button>
        </div>
    )
}

export function createNotification(alignment: NotifyAlignment, icon: Icon, title: string, description?: string, timeout?: number, onPress?: () => void, onRemove?: () => void, onTimedOut?: () => void) {
    const container = document.querySelector(".notify-container[data-alignment='" + alignment + "']");
    if (container) {
        const notifyDiv = document.createElement('div');
        notifyDiv.style.display = 'contents';
        container.appendChild(notifyDiv);
        
        const Icon = icon;
        const notify_element = React.createElement(Notify, {
            alignment: alignment,
            children: <>
                <Icon weight='bold' size={24} />
                <div className="notify-content">
                    <div className="notify-title">{title}</div>
                    <div className="notify-description">{description}</div>
                </div>
            </>,
            timeout: timeout,
            onRemove: () => {
                notifyDiv.remove();
                if (onRemove) onRemove();
            },
            onPress: () => {
                if (onPress) onPress();
            }
        });
        
        createRoot(notifyDiv).render(notify_element);
    }
}

export default Notify