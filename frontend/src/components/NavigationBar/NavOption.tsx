import { NavLink, useLocation } from "react-router-dom";


interface NavOptionProps{
    to: string;
    iconName: string;
    text: string;
    iconSize?: string;
}

export function NavOption({
    to, 
    text,
    iconName,
    iconSize = 'w-7 h-7'
}: NavOptionProps) {
    const location = useLocation();
    const isActive = location.pathname === to;

    const iconFile = isActive
    ? `/images/icons/navigationBar/${iconName}`
    : `/images/icons/navigationBar/${iconName.replace('.png', '_w.png')}`;
    return ( 
        <NavLink to={to} className="flex flex-col items-center">
            {({ isActive }) => (
                <div className="flex flex-col items-center">
                    <div
                        className={[
                            "flex flex-col items-center justify-center w-16 h-16 rounded-2xl mb-2 transition-colors",
                            isActive ? "bg-[#FCF5E2]" : "bg-transparent",
                          ].join(" ")}
                        >
                        <img
                            src={iconFile}
                            alt={text}
                            className={`${iconSize} ${isActive ? "" : "opacity-90"}`}
                        />
                    <span
                        className={[
                        "text-sm font-semibold tracking-tight transition-colors mt-1",
                        isActive ? "text-[#4D7E73]" : "text-white",
                        ].join(" ")}
                    >
                        {text}
                    </span>
                    </div>
                </div>
            )}
        </NavLink>
    );

}