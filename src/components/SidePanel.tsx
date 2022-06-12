import React, { Dispatch, FC, SetStateAction } from 'react';

const sections = [
    { id: 1, title: "Новости" },
    { id: 2, title: "Поиск" },
]



interface ISidePanelProps {
    activeSection: number
    setSection: Dispatch<SetStateAction<number>>
}

const SidePanel: FC<ISidePanelProps> = ({ activeSection, setSection }) => {

    return (
        <div className="whiteBlock self-start sticky hidden lg:block">
            <ul className="flex flex-col">
                {sections.map(t => <li key={t.id} onClick={() => setSection(t.id)}
                    className={`border-l-[3px] ${activeSection === t.id && 'border-primaryBlue font-bold '} hover:bg-gray-200 transition-colors p-2 cursor-pointer`}>
                    {t.title}
                </li>
                )}
            </ul>
        </div>
    );
};

export default SidePanel;