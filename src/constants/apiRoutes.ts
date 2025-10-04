export function generateQueryParams(queryParams: any) {
    const params = new URLSearchParams();
    for (const key in queryParams) {
        const value = queryParams[key as keyof typeof queryParams];
        if (value !== null && value !== undefined && value !== '') {
            params.append(key, String(value));
        }
    }
    const queryString = params.toString();
    return queryString
}
const basePath = ''

// src/constants/apiRoutes.ts
export const apiRoutes = {
    auth: {
        register: `${basePath}/auth/register`,
        login: `${basePath}/auth/login`,
        refreshToken: `${basePath}/auth/refresh-token`,
        forgotPassword: `${basePath}/auth/forgot-password`,
        resetPassword: `${basePath}/auth/reset-password`,
        verifyEmail: `${basePath}/auth/verify-email`,
        resendVerification: `${basePath}/auth/resend-verification`,
        mfaVerify: `${basePath}/auth/mfa/verify`,
        getRoles: `${basePath}/auth/roles`,
        googleLogin: `${basePath}/auth/google`,
        linkedinLogin: `${basePath}/auth/linkedin`,
        microsoftLogin: `${basePath}/auth/microsoft`,
        socialCallback: `${basePath}/auth/social/callback`,
        logout: `${basePath}/auth/logout`,
        changePassword: `${basePath}/auth/change-password`,
        me: `${basePath}/auth/me`,
        updateProfile: `${basePath}/auth/profile`,
        enableMfa: `${basePath}/auth/mfa/enable`,
        disableMfa: `${basePath}/auth/mfa/disable`,
        generateBackupCodes: `${basePath}/auth/mfa/backup-codes`,
        updateRole: `${basePath}/auth/role`,
        requestRole: `${basePath}/auth/role-request`,
        getPermissions: `${basePath}/auth/permissions`,
        getCompanyMembers: `${basePath}/auth/company/members`,
        addCompanyMember: `${basePath}/auth/company/members`,
        removeCompanyMember: (memberId: string) => `${basePath}/auth/company/members/${memberId}`,
        updateMemberRole: (memberId: string) => `${basePath}/auth/company/members/${memberId}/role`,
        getPendingApprovals: `${basePath}/auth/approvals/pending`,
        approveUser: (userId: string) => `${basePath}/auth/approvals/${userId}/approve`,
        rejectUser: (userId: string) => `${basePath}/auth/approvals/${userId}/reject`,
        getApprovalStatus: `${basePath}/auth/approval-status`,
        uploadApprovalDocument: `${basePath}/auth/documents/upload`,
    },
    industry: {
        dashboard: {
            getAll: (queryParams: any) => {
                const queryString = generateQueryParams(queryParams);
                return `${basePath}/get_service_requests?${queryString}`;
            },
            getById: (id: any) => `${basePath}/request/details/${id}`,
            create: `${basePath}/request/create`
        },
        requirements: {
            create: `${basePath}/create_request_note`,
            getByRequestId: (requestId: number) => `${basePath}/get_request_notes/${requestId}`,
        }
    }
};
