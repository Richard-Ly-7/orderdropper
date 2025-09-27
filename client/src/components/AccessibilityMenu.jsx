import { useAccessibility } from '../context/AccessibilityContext';

function AccessibilityMenu() {
    const {
        fontSize,
        setFontSize,
        highContrast,
        setHighContrast,
        highlightLinks,
        setHighlightLinks
    } = useAccessibility();

    return (
        <div className="acc-menu-style px-5 d-flex flex-column justify-content-center align-items-center">
            <p className="h5 px-5 text-center">Accessibility Menu</p>

            <div className="d-flex align-items-center gap-2">
                <strong className="text-nowrap">Font Size:</strong>
                <button className="font-btn" onClick={() => setFontSize('small')}>A-</button>
                <button className="font-btn" onClick={() => setFontSize('normal')}>A</button>
                <button className="font-btn" onClick={() => setFontSize('large')}>A+</button>
            </div>
            
            <div>
                <label>
                    <input
                        type="checkbox"
                        checked={highContrast}
                        className="form-check-input me-1"
                        onChange={() => setHighContrast(!highContrast)}
                    />
                    High Contrast Mode
                </label>
            </div>
            
            <div>
                <label>
                    <input
                        type="checkbox"
                        checked={highlightLinks}
                        className="form-check-input me-1"
                        onChange={() => setHighlightLinks(!highlightLinks)}
                    />
                    Highlight Links
                </label>
            </div>
        </div>
    );
}

export default AccessibilityMenu;