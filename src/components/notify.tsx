"use client";
import React from 'react';
import { Button } from '@heroui/react';
import { Icon } from '@phosphor-icons/react';
import { createRoot } from 'react-dom/client';

type NotifyAlignment = "left" | "right";

interface NotifyProps {
    children: React.ReactNode;
    alignment: NotifyAlignment;
    onPress?: () => void;
    onRemove?: () => void;
}

function Notify(props: NotifyProps) {
    const [isActive, setIsActive] = React.useState(true);
    const [isFocus, setIsFocus] = React.useState(false);

    const _this = React.useRef<HTMLDivElement>(null);
    const _wrapper = React.useRef<HTMLDivElement>(null);
    const _notify = React.useRef<HTMLAnchorElement>(null);

    React.useEffect(() => {
        setTimeout(() => {
            if ( _this.current && _notify.current )
            {
                _this.current.classList.add("notify-highlight");
                _notify.current.classList.add("notify-highlight");
                setTimeout(() => {
                    if ( _this.current && _notify.current )
                    {
                        _this.current.classList.remove("notify-highlight");
                        _notify.current.classList.remove("notify-highlight");
                    }
                }, 2400);
            }
        }, 20);
    }, [_notify])

    return (
        <div className={"notify-base " + (isActive ? "" : "notify-hide ") + (isFocus ? "notify-focused" : "")} ref={_this}>
            <Button className='trigger-only' disableRipple onPress={()=>{
                setIsActive(false);
                if (props.onPress) props.onPress();
                setTimeout(() => {
                    if (_this.current) _this.current.remove();
                    if (props.onRemove) props.onRemove();
                }, 320);
            }} tabIndex={-1}>
                <div className={"notify-wrapper " + (isActive ? "" : "notify-hide ") + (isFocus ? "notify-focused" : "")} tabIndex={0}
                    onFocus={()=>{
                        setIsFocus(true);
                    }} onBlur={()=>{
                        setIsFocus(false);
                    }}
                    ref={_wrapper}
                >
                    <a ref={_notify} className={`notify notify-${props.alignment} animation-wrapper ` + (isActive ? "notify-active " : "notify-hide ") + (isFocus ? "notify-focused" : "")} tabIndex={-1}>
                        <div className="animation-container">
                            <div className="osu-animate-background"></div>
                        </div>
                        {props.children}
                    </a>
                </div>
            </Button>
        </div>
    )
}

export function createNotification(alignment: NotifyAlignment, icon: Icon, title: string, description?: string) {
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
            onRemove: () => {
                notifyDiv.remove();
            }
        });
        
        createRoot(notifyDiv).render(notify_element);
    }
}

export default Notify