import React, { useEffect } from 'react';

function Toast({ message, showToast, hidingErrorTitle }) {
    useEffect(() => {
        let toastTimer;

        if (showToast) {
            // Show the toast for 3 seconds
            toastTimer = setTimeout(() => {
                hidingErrorTitle();
            }, 3000);
        }

        return () => {
            // Clear the timer if the component unmounts or if showToast becomes false
            clearTimeout(toastTimer);
        };
    }, [hidingErrorTitle]);

    return (
        <div className={`toast ${showToast ? 'show' : ''}`}>
            {message}
        </div>
    );
}

export default Toast;
