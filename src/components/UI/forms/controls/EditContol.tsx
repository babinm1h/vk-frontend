import React, { FC, HTMLInputTypeAttribute } from 'react';
import { FieldError, UseFormRegisterReturn } from 'react-hook-form';

interface IFormControlProps {
    id: string
    label: string
    register: UseFormRegisterReturn
    error: FieldError | undefined
    type: HTMLInputTypeAttribute
    value: any
}

const EditControl: FC<IFormControlProps> = ({ id, label, register, error, type, value }) => {
    return (
        <>
            <div className="mb-5 w-full flex items-center gap-3">
                <label htmlFor={id} className="editLabel">
                    {label}:
                </label>

                <input type={type} id={id} placeholder={label} {...register}
                    autoComplete='off' defaultValue={value || ''}
                    className={`editControl
                 ${error?.message ? "border-red-700" : "border-gray-300 "}`} />
            </div>
        </>
    );
};

export default EditControl;