import React, { useEffect } from 'react';

function Toast({ message, showToast, hidingErrorTitle }) {
    useEffect(() => {
        let toastTimer;
        alert('toast ' + showToast)
        if (showToast) {
            toastTimer = setTimeout(() => {
                hidingErrorTitle();
            }, 3000);
        }


        return () => {
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
