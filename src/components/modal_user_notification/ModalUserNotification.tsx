import React from "react";
import "./ModalUserNotification.css"
import Tooltip, {tooltipClasses} from "@mui/material/Tooltip/";


type ModalUserNotificationProps = {

    title: string | undefined,

}

interface Tooltip {

    tooltip: {
        sx: {
            width: string;
            height: string;
            color: string;
            fontSize: string;
            fontWeight: string;
            padding: string;
            lineHeight: string;
            fontStyle: string;
            fontFamily: string;
            bgcolor: string;
            borderRadius: string;
            whiteSpace: string;
            filter: string;
            [key: string]: string | { color: string; bottom: string; left: string; filter: string };

        }
    }
}

interface PopperOptions {
    popperOptions: {
        modifiers: Array<{
            name: string;
            options: { [key: string]: any };
        }>;
    };
}


const ModalUserNotification: React.FC<ModalUserNotificationProps> = ({title}) => {

    const text: string = `${title}  can only be changed via support`
    const tooltipProps:Tooltip = {
        tooltip: {
            sx: {
                width: "172px",
                height: "72px",
                color: "#3F3F3F",
                fontSize: "12px",
                fontWeight: "400",
                padding: "20px 16px 24px 16px",
                lineHeight: "14px",
                fontStyle: "normal",
                fontFamily: "Noto Sans",
                bgcolor: "#FFF",
                borderRadius: "8px",
                whiteSpace: 'normal',
                filter: "drop-shadow(0px 4px 32px rgba(0, 0, 0, 0.16)) drop-shadow(0px 0px 4px rgba(0, 0, 0, 0.04))",
                [`& .${tooltipClasses.arrow}`]: {
                    color: "#FFF",
                    bottom: "100%", // Движение стрелки сверху на вниз. 0 верх, 100 низ
                    left: '74%', // Движение стрелки с лева на право. 0 лево, 100 право
                    filter: "drop-shadow(0px 4px 32px rgba(0, 0, 0, 0.16)) drop-shadow(0px 0px 4px rgba(0, 0, 0, 0.04))"
                },
            },
        },
    };
    const popperOptions:PopperOptions = {
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
                        offset: [30, -8], // Первое значение двигает окно вправо, второе вверх
                    },
                },
            ],
        }
    }
    return (
        <Tooltip componentsProps={tooltipProps} title={text} arrow placement="top-end" PopperProps={popperOptions}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path fillRule="evenodd" clipRule="evenodd"
                      d="M1 8C1 4.13401 4.13401 1 8 1C11.866 1 15 4.13401 15 8C15 11.866 11.866 15 8 15C4.13401 15 1 11.866 1 8ZM9.16858 5.18799C8.53047 4.62964 7.46986 4.62964 6.83174 5.18799C6.60794 5.38382 6.26776 5.36114 6.07193 5.13734C5.8761 4.91354 5.89878 4.57336 6.12258 4.37753C7.16673 3.4639 8.8336 3.4639 9.87774 4.37753C10.964 5.32804 10.964 6.90273 9.87774 7.85324C9.69347 8.01448 9.49052 8.14655 9.27655 8.2501C8.79102 8.48508 8.53862 8.80567 8.53862 9.07692V9.61539C8.53862 9.91277 8.29755 10.1538 8.00016 10.1538C7.70278 10.1538 7.4617 9.91277 7.4617 9.61539V9.07692C7.4617 8.15864 8.22221 7.56395 8.80741 7.28073C8.93854 7.21727 9.06005 7.13774 9.16858 7.04278C9.76454 6.52132 9.76454 5.70945 9.16858 5.18799ZM8 12.3077C8.29738 12.3077 8.53846 12.0666 8.53846 11.7692C8.53846 11.4718 8.29738 11.2308 8 11.2308C7.70262 11.2308 7.46154 11.4718 7.46154 11.7692C7.46154 12.0666 7.70262 12.3077 8 12.3077Z"
                      fill="#9F9F9F"/>
            </svg>
        </Tooltip>
    )


}

export default ModalUserNotification