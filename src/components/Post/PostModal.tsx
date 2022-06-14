import React, { FC, useEffect } from 'react';

interface IPostModalProps {
    img: string
    onClose: () => void
}

const PostModal: FC<IPostModalProps> = ({ img, onClose }) => {

    useEffect(() => {
        document.body.style.overflow = 'hidden';

        return () => {
            document.body.style.overflow = 'auto';
        }
    }, [])


    return (
        <div className="fixed bg-black sm:bg-opacity-80 w-full h-full z-[5] top-0 left-0 right-0 flex items-center justify-center overflow-hidden sm:p-20"
            onClick={onClose}>
            <div className="" onClick={(e) => e.stopPropagation()}>
                <img src={img} alt="post image" className="w-full h-auto mt-2 object-cover" />
            </div>
        </div>
    );
};

export default PostModal;