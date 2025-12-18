import type { Profile } from "../generated/client";
export declare const createProfile: (data: {
    name: string;
    gender: string;
    address: string;
    profile_picture_url?: string;
    userId: number;
}) => Promise<Profile>;
export declare const getProfileById: (id: number) => Promise<({
    user: {
        name: string;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        email: string;
        password_hash: string;
        role: string;
    };
} & {
    name: string;
    id: number;
    createdAt: Date;
    updatedAt: Date;
    userId: number;
    gender: string;
    address: string;
    profile_picture_url: string | null;
}) | null>;
export declare const updateProfile: (id: number, data: Partial<Profile>) => Promise<{
    name: string;
    id: number;
    createdAt: Date;
    updatedAt: Date;
    userId: number;
    gender: string;
    address: string;
    profile_picture_url: string | null;
}>;
export declare const deleteProfile: (id: number) => Promise<{
    name: string;
    id: number;
    createdAt: Date;
    updatedAt: Date;
    userId: number;
    gender: string;
    address: string;
    profile_picture_url: string | null;
}>;
//# sourceMappingURL=profile.service.d.ts.map