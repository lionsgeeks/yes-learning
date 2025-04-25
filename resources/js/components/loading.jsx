import React from 'react';
import AppLogo from '@/components/app-logo';

const Loading = () => {
    return (
        <div className='animate-bounce flex items-center mx-auto justify-center'>
            <AppLogo className='w-52'/>
        </div>
    );
};

export default Loading;