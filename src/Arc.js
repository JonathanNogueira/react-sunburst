import React from 'react'; 

const Arc = ({ d, style }) => {
    return (
        <path className='arc-path fade-color' d={ d } style={ style } ></path>
    );
};

Arc.propTypes = {
    d: React.PropTypes.string.isRequired
};

export default Arc; 