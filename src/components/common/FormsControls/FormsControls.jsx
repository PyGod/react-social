import React from 'react';
import classes from './FormsControls.module.sass';

export const FormControls = (Element, type) => ({ input, meta, ...props }) => {
  const hasError = meta.touched && meta.error;

  return (
    <div className={classes.formControls}>
      <Element {...input} {...props} />

      {hasError && <span className={classes.errorText}>{meta.error}</span>}
    </div>
  );
};
