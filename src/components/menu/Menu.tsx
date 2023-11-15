import React, {useState, useEffect} from 'react';
import "./menu.css"
import {Link} from 'react-router-dom';
import Tooltip from "@mui/material/Tooltip/";



const Menu = () => {
    const [activeLink, setActiveLink] = useState("");
    const [menuState, setMenuState] = useState("menu_section_close");
    const [hoverState, setHoverState] = useState<boolean>(false);

    const tooltipProps = {
        tooltip: {
            sx: {
                width: "71px",
                height: "24px",
                padding: "4px 8px 4px 8px",
                borderRadius: "4px",
                fontsize: "12px",
                fontFamily: "Titillium Web",
                textAlign: "center",
                right: "100%",
            },
        },
    };
    const popperOptions= {
        popperOptions: {
            modifiers: [
                {
                    name: 'arrow',
                    options: {
                        element: '.MuiTooltip-popper',
                    },
                },
                {
                    name: 'flip',
                    options: {
                        enabled: true, // Разрешить переворот, если Tooltip выходит за пределы экрана
                    },
                },
                {
                    name: 'offset',
                    options: {
                        offset: [0, 8], // Первое значение двигает окно по вертикали, второе удаляет/ приближает
                    },
                },
            ],
        }
    }


    useEffect(() => {
        const currentPath = window.location.pathname;
        if (currentPath.includes("shipments")) {
            setActiveLink("shipments")
        } else if (currentPath.includes("items")) {
            setActiveLink("items")
        } else if (currentPath.includes("spaces")) {
            setActiveLink("spaces")
        } else if (currentPath.includes("notifications")) {
            setActiveLink("notifications")
        } else if (currentPath.includes("profile")) {
            setActiveLink("profile")
        } else {
            setActiveLink("")
        }
    }, [])

    const handleLinkClick = (link: any) => {
        setActiveLink(link)
    }

    //меняет соостояние менюшки открвыто/закрыто
    const handlMenu_state = () => {
        setMenuState(menuState === "menu_section_close" ? "menu_section_open" : "menu_section_close");
        setHoverState((hoverState) => !hoverState)

    }

    return (
        <div className={menuState}>
            <div className='menu_logo'/>
            <div className='hr'></div>

            <div className='nav_menu'>
                <Tooltip PopperProps={popperOptions} componentsProps={tooltipProps} title="Shipments" placement="right"
                         disableHoverListener={hoverState}>
                    <Link to={"shipments"} className={`link_menu ${activeLink === "shipments" ? "active_link" : ""}`}
                          onClick={() => handleLinkClick("shipments")}>
                        <div className='logo_link'></div>
                        <p className='item_link'>Shipments</p>
                    </Link>
                </Tooltip>
                <Tooltip PopperProps={popperOptions} componentsProps={tooltipProps} title="Items" placement="right"
                         disableHoverListener={hoverState}>
                    <Link to={"items"} className={`link_menu ${activeLink === "items" ? "active_link" : ""}`}
                          onClick={() => handleLinkClick("items")}>
                        <div className='logo_link'></div>
                        <p className='item_link'>Items</p>
                    </Link>
                </Tooltip>
                <Tooltip PopperProps={popperOptions} componentsProps={tooltipProps} title="Spaces" placement="right"
                         disableHoverListener={hoverState}>
                    <Link to={"spaces"} className={`link_menu ${activeLink === "spaces" ? "active_link" : ""}`}
                          onClick={() => handleLinkClick("spaces")}>
                        <div className='logo_link'></div>
                        <p className='item_link'>Spaces</p>
                    </Link>
                </Tooltip>
                <Tooltip PopperProps={popperOptions} componentsProps={tooltipProps} title="Notifications"
                         placement="right" disableHoverListener={hoverState}>
                    <Link to={"notifications"}
                          className={`link_menu ${activeLink === "notifications" ? "active_link" : ""}`}
                          onClick={() => handleLinkClick("notifications")}>
                        <div className='logo_link'></div>
                        <p className='item_link'>Notifications</p>
                    </Link>
                </Tooltip>

                <div className='menu_footer'>
                    <Tooltip PopperProps={popperOptions} componentsProps={tooltipProps} title="Profile"
                             placement="right" disableHoverListener={hoverState}>
                        <Link to={"profile"} className={`link_menu ${activeLink === "profile" ? "active_link" : ""}`}
                              onClick={() => handleLinkClick("profile")}>
                            <div className='logo_link'></div>
                            <p className='item_link'>Profile</p>
                        </Link>
                    </Tooltip>

                    <div className='hr'></div>
                    <div className='menu_control' onClick={handlMenu_state}>
                        <div className='logo_link'></div>
                        <p className='item_link'>Close</p>
                    </div>
                </div>
            </div>


        </div>
    );
};

export default Menu;