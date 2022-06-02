import React from 'react';


const NewsPanel = () => {
    return (
        <div className="whiteBlock self-start sticky">
            <ul className="flex flex-col">
                <li className="border-l-[3px] border-primaryBlue font-bold hover:bg-gray-200 transition-colors p-2 cursor-pointer">
                    Новости
                </li>
                <li className="hover:bg-gray-200 transition-colors p-2 cursor-pointer">
                    Поиск
                </li>
            </ul>
        </div>
    );
};

export default NewsPanel;