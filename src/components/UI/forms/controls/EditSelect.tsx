import React, { FC } from 'react';
import { UseFormRegisterReturn, FieldError } from 'react-hook-form';

interface IEditSelectProps {
    label: string
    options: string[]
    id: string
    register: UseFormRegisterReturn
    error: FieldError | undefined
}

const EditSelect: FC<IEditSelectProps> = ({ label, options, id, error, register }) => {
    return (
        <div className="flex items-center gap-3 mt-5">
            <label htmlFor={id} className="editLabel">
                {label}:
            </label>
            <select id={id} className="editControl" {...register}>
                {options.map(o => <option value={o} key={o}>{o}</option>)}
            </select>

            {error?.message && <div className='mt-1 text-red-600'>{error.message}</div>}
        </div>
    );
};

export default EditSelect;