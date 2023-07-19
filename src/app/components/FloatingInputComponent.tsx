import React from 'react';

type FloatingInputComponentProps = {
    sideBarOpened: boolean;
};

const FloatingInputComponent:React.FC<FloatingInputComponentProps> = ({sideBarOpened}) => {
    
    return <div className={`absolute ${sideBarOpened ? 'md:pl-[250px]' : ''} bottom-0 mb-2 text-dark`}>
        <p className=''>Hello</p>
    </div>
}
export default FloatingInputComponent;