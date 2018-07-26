import zxcvbn from 'zxcvbn';

export const isFilledOut = value => (value ? undefined : 'Required');

export const isEmail = value =>
  (value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Invalid email address'
    : undefined);

export const buildPasswordRejectionMessage = feedback => {
  let message = 'Please choose a stronger password.';
  if (feedback.warning) message = feedback.warning + '. ' + message;
  if (feedback.suggestions) {
    message += '\n\nSuggestions:\n- ' + feedback.suggestions.join('\n- ');
  }
  return message;
};

export const isStrongPassword = value => {
  const verdict = zxcvbn(value);
  const { feedback } = verdict;
  return verdict.score < 2 ? buildPasswordRejectionMessage(feedback) : undefined;
};
