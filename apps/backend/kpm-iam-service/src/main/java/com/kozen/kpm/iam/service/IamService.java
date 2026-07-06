package com.kozen.kpm.iam.service;

import com.kozen.kpm.iam.dto.ChangePasswordRequest;
import com.kozen.kpm.iam.dto.AuthenticatedUserDto;
import com.kozen.kpm.iam.dto.LoginResponseDto;
import com.kozen.kpm.iam.dto.LoginRequest;
import com.kozen.kpm.iam.dto.PasswordCodeResponse;
import com.kozen.kpm.iam.dto.ProfileDto;

/**
 * IAM domain service.
 * Responsible for login verification and current-user authorization data aggregation.
 */
public interface IamService {
    /** Verify account/password and return a development token plus user profile. */
    LoginResponseDto login(LoginRequest request);

    /** Load one user by account with departments, roles and effective permissions. */
    AuthenticatedUserDto me(String account);

    /** Load current user's profile card and personal achievement statistics. */
    ProfileDto profile(String account);

    /** Verify old password, generate a short-lived email code and store it in Redis. */
    PasswordCodeResponse requestPasswordCode(ChangePasswordRequest request);

    /** Change current user's password after verifying old password and email code. */
    boolean changePassword(ChangePasswordRequest request);
}
