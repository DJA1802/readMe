import zxcvbn from 'zxcvbn';

export const isFilledOut = value => (value ? undefined : 'Required');

export const isEmail = value =>
  (value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Invalid email address'
    : undefined);

export const isStrongPassword = value =>
  (zxcvbn(value).score < 2
    ? `${zxcvbn(value).feedback.warning}. Please choose a stronger password.`
    : undefined);
