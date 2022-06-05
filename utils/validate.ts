

export const validate = (min: number, max: number) => ({
    required: { value: true, message: "Обязательное поле" },
    minLength: { value: min, message: `Минимальная длина ${min} символов` },
    maxLength: { value: max, message: `Максимальная длина ${max} символов` }
})