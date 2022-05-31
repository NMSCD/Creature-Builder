import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react';
import React from 'react';
import { Link } from 'wouter';
import { Routes } from '../../constants/routes';

interface IPageBreadcrumb {
    currentPageName?: string;
    currentPageRoute?: string
}

export const PageBreadcrumb: React.FC<IPageBreadcrumb> = (props: IPageBreadcrumb) => {
    if (props.currentPageRoute == null) return null;
    return (
        <Breadcrumb mb={4}>
            <BreadcrumbItem>
                <BreadcrumbLink as={Link} to={Routes.builder}>Home</BreadcrumbLink>
            </BreadcrumbItem>

            {
                (props.currentPageRoute != null) &&
                (<BreadcrumbItem isCurrentPage>
                    <BreadcrumbLink as={Link} to={props.currentPageRoute}>{props.currentPageName}</BreadcrumbLink>
                </BreadcrumbItem>
                )
            }
        </Breadcrumb>
    );
}

