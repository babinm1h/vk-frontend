import React from 'react';
import MainLayout from '../../../layouts/MainLayout/MainLayout';
import EditProfileForm from '../../../UI/forms/EditProfileForm';


const EditProfile = () => {
    return (
        <MainLayout>
            <section className="whiteBlock w-full self-start">
                <h1 className="font-semibold text-lg border-b border-gray-300 py-3 px-5">
                    Основное
                </h1>
                <EditProfileForm />
            </section>

        </MainLayout>
    );
};

export default EditProfile;