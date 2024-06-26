import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Drawer, DrawerContent } from '@progress/kendo-react-layout';
import {
    useLocalization
} from "@progress/kendo-react-intl";
import { Header } from './Header.jsx';
import { gridIcon, calendarIcon, userIcon, infoCircleIcon} from '@progress/kendo-svg-icons'

const items = [
    { name: 'dashboard', svgIcon: gridIcon, route: '/', selected: true },
    { name: 'planning', svgIcon: calendarIcon, route: '/planning', selected: false },
    { name: 'profile', svgIcon: userIcon, route: '/profile', selected: false },
    { separator: true },
    { name: 'info', svgIcon: infoCircleIcon, route: '/info', selected: false }
];

const DrawerRouterContainer = (props) => {

    const navigate = useNavigate();
    const localization = useLocalization();

    const [expanded, setExpanded] = React.useState(false);
    const [selectedId, setSelectedId] = React.useState(items.findIndex(x => x.selected === true));
    const [isSmallerScreen, setIsSmallerScreen] = React.useState(window.innerWidth < 768);

    const resizeWindow = () => {
        setIsSmallerScreen(window.innerWidth < 768);
    }

    const handleClick = (e) => {
        setExpanded(!expanded);
    }

    const handleSelect = (e) => {
        setSelectedId(e.itemIndex);
        setExpanded(false);
        navigate(e.itemTarget.props.route);
    }

    React.useEffect(() => {
        window.addEventListener('resize', resizeWindow, false)
        resizeWindow();
    }, [])

    return (
        <React.Fragment>
            <Header
                onButtonClick={handleClick}
            />
            <Drawer
                expanded={expanded}
                animation={{ duration: 100 }}
                items={items.map((item, index) => ({
                    ...item,
                    text: localization.toLanguageString(`custom.${item.name}`),
                    selected: index === selectedId
                }))
                }
                position='start'
                mode={isSmallerScreen ? 'overlay' : 'push'}
                mini={isSmallerScreen ? false : true}

                onOverlayClick={handleClick}
                onSelect={handleSelect}
            >
                <DrawerContent style={{ height: 1066 }}>
                    {props.children}
                </DrawerContent>
            </Drawer>
        </React.Fragment>
    )
}

export default DrawerRouterContainer;

