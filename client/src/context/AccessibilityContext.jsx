import { createContext, useContext, useState } from 'react';

const AccessibilityContext = createContext();

export function AccessibilityProvider({ children }) {
    const [fontSize, setFontSize] = useState('normal');
    const [highContrast, setHighContrast] = useState(false);
    const [highlightLinks, setHighlightLinks] = useState(false);

    const value = {
        fontSize,
        setFontSize,
        highContrast,
        setHighContrast,
        highlightLinks,
        setHighlightLinks
    };

    return (
        <AccessibilityContext.Provider value={value}>
            {children}
        </AccessibilityContext.Provider>
    );
}

export function useAccessibility() {
    return useContext(AccessibilityContext);
}