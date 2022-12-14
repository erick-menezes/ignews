import { useRouter } from "next/router";
import { ReactElement, cloneElement } from "react";
import Link, { LinkProps } from "next/link";

interface ActiveLinkProps extends LinkProps {
    children: ReactElement;
    activeClassName: string;
}

export function ActiveLink({ children, activeClassName, ...rest }: ActiveLinkProps) {
    const { asPath } = useRouter();

    const className = asPath === rest.href ? activeClassName : '';

    return (
        <Link {...rest} className={asPath === '/' ? activeClassName : ''}>
            {cloneElement(children, {
                className
            })}
        </Link>
    );
}