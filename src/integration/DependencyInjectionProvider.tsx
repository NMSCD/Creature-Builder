import * as React from 'react';
import { ReactNode } from "react";
import { IDependencyInjection, registerServices } from './IDependencyInjection';


export const DependencyInjectionContext = React.createContext<IDependencyInjection>(
    {} as any
);
interface IDependencyInjectionProviderProps {
    children: ReactNode;
    overriddenServices?: IDependencyInjection | any;
}
export const DependencyInjectionProvider: React.FC<IDependencyInjectionProviderProps> = (
    props: IDependencyInjectionProviderProps
) => {
    const { children, overriddenServices } = props;

    const defaultDeps = registerServices();
    const services: IDependencyInjection = {
        ...defaultDeps,
        ...overriddenServices,
    }

    return (
        <DependencyInjectionContext.Provider
            value={services}
        >
            {children}
        </DependencyInjectionContext.Provider>
    );
};

export function withDependencyInjectionProvider<TProps>(
    WrappedComponent: any
): React.FC<TProps> {
    return (props: TProps) => (
        <DependencyInjectionContext.Provider
            value={registerServices()}
        >
            <WrappedComponent {...props} />
        </DependencyInjectionContext.Provider>
    );
}
export function withDependencyInjectionConsumer<
    WithoutExpectedDependencyInjectionType,
    ExpectedDependencyInjectionType
>(
    WrappedComponent: any,
    mapper: (
        DependencyInjection: IDependencyInjection
    ) => ExpectedDependencyInjectionType
) {
    const wrapper: React.FC<WithoutExpectedDependencyInjectionType> = (
        props: WithoutExpectedDependencyInjectionType
    ) => {
        return (
            <DependencyInjectionContext.Consumer>
                {(DependencyInjection: IDependencyInjection) => (
                    <WrappedComponent {...mapper(DependencyInjection)} {...props} />
                )}
            </DependencyInjectionContext.Consumer>
        );
    };
    return wrapper;
}

export function withServices<WithoutExpectedServicesType, ExpectedServicesType>(WrappedComponent: any, mapper: (services: IDependencyInjection) => ExpectedServicesType) {
    const wrapper: React.FC<WithoutExpectedServicesType> = (props: WithoutExpectedServicesType) => {
        return (
            <DependencyInjectionContext.Consumer>
                {
                    (services: IDependencyInjection) =>
                        <WrappedComponent {...(mapper(services))} {...props} />
                }
            </DependencyInjectionContext.Consumer>
        );
    }
    return wrapper;
}
