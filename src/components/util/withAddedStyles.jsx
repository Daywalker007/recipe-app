import React from 'react';

const withAddedStyles = (WrappedComponent, additionalClasses) => {
  return (props) => {
    // console.log('Current Props of Changed Field: ', props)
    const { className = '', ...restProps } = props; // Destructure className and other props

    // Combine the existing className with the additional classes
    const combinedClasses = [
      ...className.split(' '),
      ...additionalClasses.split(' '),
    ];

    // Pass the combined class list and the rest of the props to the WrappedComponent
    return <WrappedComponent className={combinedClasses.join(' ')} {...restProps} />;
  };
};

export default withAddedStyles;
