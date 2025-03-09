import React, { useState, useEffect } from 'react';

const Accordion = ({ title, icon, children }) => {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        if (title === 'Credit Card') {
            setIsOpen(true);
        }
    }, [title]);

    const handleToggle = () => {
        // Close other accordions
        document.querySelectorAll('.accordion-item').forEach((item) => {
            if (item !== document.getElementById(title)) {
                item.querySelector('.accordion-content').classList.add('hidden');
            }
        });

        setIsOpen(!isOpen);
    };

    return (
        <div className="accordion-item bg-bg p-30" id={title}>
            <button
                className="accordion-header flex justify-between w-full py-2 text-gray-700 hover:text-gray-900 focus:outline-none"
                onClick={handleToggle}
            >
                <span className="flex items-center">
                    <span className="ml-2 font-bold ">{title}</span>
                </span>
                <img src={icon} alt="icon" />
            </button>
            <div className={`accordion-content ${isOpen ? 'block' : 'hidden'} p-4 text-gray-600`}>
                {children}
            </div>
        </div>
    );
};

export default Accordion;
