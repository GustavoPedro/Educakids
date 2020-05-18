import React from 'react';


const LabelError = ({error}) => {
    return (
        <div>
            <p style={{color:"red"}} >{error}</p>
        </div>
    );
}

export default LabelError;