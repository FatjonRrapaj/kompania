const patternTypes: Record<string, RegExp> = {
  phone: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
  email: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
};

/**
 * Validates a field based on specified criteria.
 *
 * @param options - Configuration options for validation.
 * @param options.fieldName - The name of the field being validated.
 * @param options.pattern - A regular expression pattern for validation (optional).
 * @param options.patternType - The type of pattern to use from the patternTypes object.
 * @param options.min - The minimum length required for the field (optional, default: -1).
 * @param options.max - The maximum length allowed for the field (optional, default: -1).
 * @param options.required - Indicates whether the field is required (optional, default: false).
 *
 * @returns A validation function that accepts a value and returns an error message if validation fails.
 */
const validateField = ({
  fieldName,
  pattern,
  patternType,
  min = -1,
  max = -1,
  required = false,
  match = undefined,
}: {
  fieldName: string;
  pattern?: RegExp;
  patternType?: keyof typeof patternTypes;
  min?: number;
  max?: number;
  required?: boolean;
  match?: string;
}) => {
  return function validate(value: string): string | undefined {
    if (required && !value) {
      return `${fieldName} is required`;
    }
    if (required && value && min !== -1 && value.length < min) {
      return `${fieldName} must be at least ${min} characters`;
    }
    if (required && value && max !== -1 && value.length > max) {
      return `${fieldName} must be a maximum of ${max} characters`;
    }
    if (match) {
      if (match !== value) {
        return `${fieldName} does not match!`;
      }
    }
    if (
      required &&
      value &&
      patternType &&
      !!patternTypes[patternType] &&
      !patternTypes[patternType].test(value)
    ) {
      return `Invalid ${fieldName.toLowerCase()}`;
    }
    if (required && value && !!pattern && !pattern?.test(value)) {
      return `Invalid ${fieldName.toLowerCase()}`;
    }
  };
};

export default validateField;
