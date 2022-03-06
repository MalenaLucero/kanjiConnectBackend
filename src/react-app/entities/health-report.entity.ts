interface HealthState {
    error: string[],
    checked: {
        section: number[]
    }
}

export interface HealthReport { 
    japanese: HealthState, 
    korean: HealthState 
}

export const emptyHealthReport: HealthReport = {
    japanese: {
        error: [],
        checked: {
            section: []
        }
    }, korean: {
        error: [],
        checked: {
            section: []
        }
    }
}

export type Language = 'japanese' | 'korean';

export type CheckedItem = 'section';

