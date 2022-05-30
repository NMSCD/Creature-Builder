import React from "react";

interface IState {
    srcUrl: string,
    errored: boolean,
}

interface IProps {
    alt?: string;
    imageUrl: string;
    fallbackSrc?: string;
    imageName?: string;
    classNames?: string;
    style?: any;
    onClick?: (e?: any) => void;
}

export class BasicImage extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = {
            srcUrl: props.imageUrl,
            errored: false,
        };
    }

    onError = () => {
        if (!this.state.errored) {
            this.setState(() => {
                return {
                    srcUrl: this.props.fallbackSrc ?? this.props.imageUrl,
                    errored: true,
                }
            });
        }
    }

    render() {
        const { srcUrl, errored } = this.state;

        return (
            <img
                src={srcUrl}
                className={this.props?.classNames ?? '' + (errored ? 'error' : '')}
                style={this.props.style}
                onError={this.onError}
                onClick={this.props.onClick}
                alt={(this.props.alt ?? this.props.imageName) ?? 'Emote button'}
                draggable={false}
            />
        );
    }
}