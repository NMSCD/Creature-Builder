export interface ISettingOptionAttrMapping {
    [name: string]: string;
}

export interface ISettingOptionCompProps<T> {
    id: string,
    label: string,
    value: T,
    additionalProps?: ISettingOptionAttrMapping;
    onChange: (newValue: T) => void
}