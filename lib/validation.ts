export const MIN_PASSWORD_LENGTH = 4

export function validateEmail(value: string): string[] | undefined {
    if (!value) return ['Email is required.']
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return ['Please enter a valid email address.']
}

export function validateName(value: string): string[] | undefined {
    if (!value) return ['Name is required.']
}

export function validateNewPassword(value: string): string[] | undefined {
    if (!value) return ['Password is required.']
    if (value.length < MIN_PASSWORD_LENGTH) {
        return [`Password must be at least ${MIN_PASSWORD_LENGTH} characters long.`]
    }
}

export function validatePresence(value: string, label: string): string[] | undefined {
    if (!value) return [`${label} is required.`]
}
