import React from 'react';
import './ChartShell.scss';

//TODO create not data message
const ChartShell = ({ children, hasData, viewBox }) => {
    return (
        <div className='chart-shell'>
            { hasData ? 
                ( <svg width='100%' height='100%' viewBox={ viewBox } preserveAspectRatio="xMinYMin meet">
                    { children }
                  </svg>  
                ) : (
                    <div className='no-data-msg'>No data available</div>
                )
            }
        </div>
    );
};

export default ChartShell;