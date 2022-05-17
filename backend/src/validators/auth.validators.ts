import Joi from 'joi';

const emailPattern = '^(?:[a-z0-9!#$%&\'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&\'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\\])$';
const phonePattern = '^[\\+]{0,1}380([0-9]{9})$';

export const authValidator = Joi.object({
    name: Joi.string()
        .required()
        .min(2)
        .max(60)
        .trim()
        .messages({
            'string.base': 'name should be a type of text',
            'string.empty': 'name cannot be an empty field',
            'string.min': 'name should have a minimum length of {#limit}',
            'string.max': 'name should have a maximum length of {#limit}',
            'any.required': 'name is a required field',
        }),
    email: Joi.string()
        .required()
        .min(6)
        .max(100)
        .regex(new RegExp(emailPattern))
        .messages({
            'string.min': 'Email should have a minimum length of {#limit}',
            'string.max': 'Email should have a maximum length of {#limit}',
            'string.pattern.base': 'The email must be a valid email address.',
            'any.required': 'Email is a required field',
            'string.empty': 'Email not allowed to be empty',
        })
        .trim(),
    phone: Joi.string()
        .required()
        .regex(new RegExp(phonePattern))
        .messages({
            'string.pattern.base': 'Phone field is required.',
            'any.required': 'Phone is a required field',
            'string.empty': 'Phone not allowed to be empty',
        })
        .trim(),
    positionId: Joi.number()
        .required()
        .min(1)
        .max(4)
        .messages({
            'number.min': 'Position_id should have a minimum length of {#limit}',
            'number.max': 'Position_id should have a maximum length of {#limit}',
            'any.required': 'The position field is required.',
            'number.base': 'The position field must be a type of number',
        }),
});
