import React from 'react'; 

const Arc = ({ d, style, onMouseOver, onMouseOut }) => {
    return (
        <path className='arc-path fade-color' onMouseOut={ onMouseOut } 
            onMouseOver={ onMouseOver } d={ d } style={ style } ></path>
    );
};

Arc.propTypes = {
    d: React.PropTypes.string.isRequired
};

export default Arc; 