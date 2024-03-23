import i18next from "i18next";

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
      return `${fieldName} ${i18next.t("form:isRequired")}`;
    }
    if (required && value && min !== -1 && value.length < min) {
      return `${fieldName} ${i18next.t(
        "form:mustBeAtLeast"
      )} ${min} ${i18next.t("form:characters")}`;
    }
    if (required && value && max !== -1 && value.length > max) {
      return `${fieldName}  ${i18next.t(
        "form:mustBeAMaximum"
      )} ${max} ${i18next.t("form:characters")}`;
    }
    if (match) {
      if (match !== value) {
        return `${fieldName} ${i18next.t("form:doesNotMatch")}`;
      }
    }
    if (
      required &&
      value &&
      patternType &&
      !!patternTypes[patternType] &&
      !patternTypes[patternType].test(value)
    ) {
      return `${fieldName.toLowerCase()} ${i18next.t("form:isInvalid")}`;
    }
    if (required && value && !!pattern && !pattern?.test(value)) {
      return `${fieldName.toLowerCase()} ${i18next.t("form:isInvalid")}`;
    }
  };
};

export default validateField;
