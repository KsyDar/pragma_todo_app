export default {
  extends: [
    "stylelint-config-standard-scss",
    "stylelint-config-idiomatic-order",
    "stylelint-config-recommended-vue",
  ],
  plugins: [
    "stylelint-order",
    "stylelint-declaration-block-no-ignored-properties",
  ],
  rules: {
    "plugin/declaration-block-no-ignored-properties": true,
    "selector-class-pattern": [
      "^.[a-z0-9]+(-[a-z0-9]+)*(__[a-z0-9]+(-[a-z0-9]+)*)?(_[a-z0-9]+(-[a-z0-9]+)*)?$",
      {
        resolveNestedSelectors: true,
        message: (value) => `Класс ${value} не является БЭМ-подобным`,
      },
    ],
    "color-hex-length": "short",
    "no-unknown-animations": true,
    "max-nesting-depth": 6,
    "font-weight-notation": "numeric",
    "property-no-vendor-prefix": [
      true,
      {
        ignoreProperties: ["appearance"],
      },
    ],
    "declaration-no-important": [
      true,
      {
        severity: "error",
      },
    ],
    "keyframes-name-pattern": [
      "^([a-z])+([A-Za-z])",
      {
        message: "Название должно быть в camelCase",
      },
    ],
    "at-rule-no-unknown": null,
    "scss/at-rule-no-unknown": true,
    "scss/dollar-variable-pattern": [
      "^([a-z])+([A-Za-z]|[0-9])*$",
      {
        message: "Название должно быть в camelCase",
      },
    ],
    "scss/at-mixin-pattern": "^[a-z]+(_[a-z]+)*$",
    "scss/at-function-pattern": "^_?[a-z]+(-[a-z]+)*$",
    "scss/operator-no-newline-after": null,
  },
};
