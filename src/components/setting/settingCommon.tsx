type SimpleStringFunc = (input: string) => void

export interface ISettingOptionAttrMapping {
    [name: string]: string | SimpleStringFunc;
}

export interface ISettingOptionCompProps<T> {
    id: string,
    label: string,
    value: T,
    additionalProps?: ISettingOptionAttrMapping;
    onChange: (newValue: T) => void
    getCurrentJson: () => string
}