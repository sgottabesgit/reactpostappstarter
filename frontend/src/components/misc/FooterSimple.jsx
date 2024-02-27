// FooterSimple.jsx
import React from 'react';
import { Container, Group, Anchor } from '@mantine/core';
import { MantineLogo } from '@mantinex/mantine-logo'; // Assuming this is the correct import path for MantineLogo
import classes from './FooterSimple.module.css';
import SVGComponent from "./svgviewer-react-output";


const links = [
    { link: '#', label: 'Contact' },
    { link: '#', label: 'Privacy' },
    { link: '#', label: 'Blog' },
    { link: '#', label: 'Careers' },
];

const FooterSimple = () => {
    const items = links.map((link) => (
        <Anchor
            color="dimmed"
            key={link.label}
            href={link.link}
            onClick={(event) => event.preventDefault()}
            size="sm"
        >
            {link.label}
        </Anchor>
    ));

    return (
        <div className={classes.footer}>
            <Container className={classes.inner}>
                <SVGComponent />
                <Group className={classes.links}>{items}</Group>
            </Container>
        </div>
    );
};

export default FooterSimple;
