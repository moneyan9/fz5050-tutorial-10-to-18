export interface VtuberDetails {
    fullName: string;
    height?: number;
    language: Array<'japanese' | 'english' | 'other'>;
    details: string;
    groupid?: number;
    inAction: boolean;
}