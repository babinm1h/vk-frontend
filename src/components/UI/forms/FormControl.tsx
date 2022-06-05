import React, { FC, HTMLInputTypeAttribute } from 'react';
import { FieldError, UseFormRegisterReturn } from 'react-hook-form';

interface IFormControlProps {
    id: string
    label: string
    register: UseFormRegisterReturn
    error: FieldError | undefined
    type: HTMLInputTypeAttribute
}

const FormControl: FC<IFormControlProps> = ({ id, label, register, error, type }) => {
    return (
        <div className="mb-5 w-full">
            <label htmlFor={id} className="block mb-1 font-bold">
                {label}
            </label>

            <input type={type} id={id} placeholder={label} {...register}
                className={`w-full border bg-white  p-2  rounded-lg bg-transparent
                 ${error?.message ? "border-red-700" : "border-gray-300 focus:border-primaryBlue"}`} />

            {error && <div className="text-red-700 mt-1">
                {error.message}
            </div>}
        </div>
    );
};

export default FormControl;