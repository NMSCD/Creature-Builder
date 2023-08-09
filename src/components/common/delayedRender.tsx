import React, { ReactNode, useEffect, useState } from 'react';

interface IProps {
    delay: number;
    children: ReactNode;
}

export const DelayedRender: React.FC<IProps> = (props: IProps) => {
    const [showShildren, setShowShildren] = useState<boolean>(false);

    useEffect(() => {
        setTimeout(() => {
            setShowShildren(true);
        }, props.delay);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (showShildren) {
        return (
            <>
                {props.children}
            </>
        );
    }

    return (
        <div className="not-rendered"></div>
    );
}

