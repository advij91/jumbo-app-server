import React, { useState, useEffect, useRef } from 'react';

const Header = () => {
    const [showMenu, setShowMenu] = useState(false);
    const menuRef = useRef(null);
    const buttonRef = useRef(null); // Ref for the "Settings" button

    const toggleMenu = () => {
        setShowMenu((prev) => !prev);
    };

    const handleClickOutside = (event) => {
        // Close the menu only if the click is outside both the menu and the button
        if (
            menuRef.current &&
            !menuRef.current.contains(event.target) &&
            buttonRef.current &&
            !buttonRef.current.contains(event.target)
        ) {
            setShowMenu(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <header className="p-4 bg-light border-b border-gray-300">
            <button
                ref={buttonRef} // Reference for the button
                onClick={toggleMenu}
                className="px-4 py-2 bg-primary text-white rounded-md shadow-md hover:bg-secondary focus:outline-none"
            >
                Settings
            </button>
            {showMenu && (
                <div
                    ref={menuRef} // Reference for the menu
                    className="mt-2 bg-white border border-gray-300 rounded-md shadow-lg p-4"
                >
                    <ul className="list-none p-0 m-0">
                        <li className="mb-2">
                            <a
                                href="/outlets"
                                className="text-secondary hover:text-primary transition-colors"
                            >
                                Outlets
                            </a>
                        </li>
                        <li className="mb-2">
                            <a
                                href="/categories"
                                className="text-secondary hover:text-primary transition-colors"
                            >
                                Categories
                            </a>
                        </li>
                        <li className="mb-2">
                            <a
                                href="/items"
                                className="text-secondary hover:text-primary transition-colors"
                            >
                                Items
                            </a>
                        </li>
                        <li>
                            <a
                                href="/charges"
                                className="text-secondary hover:text-primary transition-colors"
                            >
                                Charges
                            </a>
                        </li>
                    </ul>
                </div>
            )}
        </header>
    );
};

export default Header;