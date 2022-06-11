import React from 'react';
import s from '../../styles/Loader.module.css'

const Loader = () => {
    return (
        <>
            <div className={s.ldsRing}><div></div><div></div><div></div><div></div></div>
        </>
    );
};

export default Loader;