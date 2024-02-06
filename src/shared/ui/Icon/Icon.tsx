import React, { memo } from 'react';
import { IconBaseProps } from "react-icons/lib/cjs/iconBase";

import cls from './Icon.module.scss';
import { classNames } from '../../lib';

type ReactSVGProps = React.SVGProps<SVGSVGElement>

type SvgProps = Omit<ReactSVGProps, 'onClick'> & IconBaseProps;

interface LocalIconBaseProps extends SvgProps {
    className?: string;
    Svg: React.VFC<React.SVGProps<SVGSVGElement>>;
}

interface NonClickableIconProps extends LocalIconBaseProps {
    clickable?: false;
}

interface ClickableBaseProps extends LocalIconBaseProps {
    clickable: true;
    onClick: () => void;
}

type IconProps = NonClickableIconProps | ClickableBaseProps;
export const Icon = memo((props: IconProps) => {
    const {
        className,
        Svg,
        width = 32,
        height = 32,
        clickable,
        ...otherProps
    } = props;

    const icon = (
        <Svg
            className={classNames(cls.Icon, {}, [className])}
            width={width}
            height={height}
            {...otherProps}
            onClick={undefined}
        />
    );

    if (clickable) {
        return (
            <button
                type="button"
                className={cls.button}
                onClick={props.onClick}
                style={{ height, width }}
            >
                {icon}
            </button>
        );
    }

    return icon;
});
