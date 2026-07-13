-- Keep permission catalog aligned with the real menu/button registry.

DELETE FROM kpm_role_permissions WHERE permission_id IN (SELECT id FROM kpm_permissions WHERE code = 'button:templates:copy');
DELETE FROM kpm_user_permissions WHERE permission_id IN (SELECT id FROM kpm_permissions WHERE code = 'button:templates:copy');
DELETE FROM kpm_permissions WHERE code = 'button:templates:copy';

INSERT INTO kpm_permissions (id, code, name, permission_type, target, location)
VALUES
  ('perm-btn-user-reset-password','button:users:reset-password','用户管理 / 重置密码','BUTTON','重置密码','用户管理'),
  ('perm-btn-resources-edit','button:resources:edit','资源管理 / 维护配置','BUTTON','维护配置','资源管理')
ON CONFLICT (code) DO UPDATE SET
  name = EXCLUDED.name,
  permission_type = EXCLUDED.permission_type,
  target = EXCLUDED.target,
  location = EXCLUDED.location;

INSERT INTO kpm_role_permissions (role_id, permission_id)
SELECT 'role-admin', id
FROM kpm_permissions
WHERE code IN ('button:users:reset-password','button:resources:edit')
ON CONFLICT DO NOTHING;
