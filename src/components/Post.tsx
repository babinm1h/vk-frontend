import React from 'react';
import { ChatIcon, HeartIcon } from '../../public/icons';

const Post = () => {
    return (
        <div className="whiteBlock p-5">
            <p className="">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. At velit nihil architecto aperiam rerum amet. Laudantium aspernatur inventore commodi rem.
            </p>

            <div className="flex items-center gap-5 mt-3">
                <div className="postAction">
                    <HeartIcon className='w-6 h-6' />
                    <span className="font-semibold">100</span>
                </div>
                <div className="postAction">
                    <ChatIcon className='w-6 h-6 text-gray-500' />
                    <span className="font-semibold">100</span>
                </div>
            </div>
        </div>
    );
};

export default Post;