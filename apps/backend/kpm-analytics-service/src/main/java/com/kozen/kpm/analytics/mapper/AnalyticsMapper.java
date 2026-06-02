package com.kozen.kpm.analytics.mapper;

import com.kozen.kpm.common.mapper.JdbcMapMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

/** Analytics query mapper. Owns read-only SQL for dashboards. */
@Repository
public class AnalyticsMapper extends JdbcMapMapper {
    public AnalyticsMapper(JdbcTemplate jdbc) { super(jdbc); }

    public Integer intValue(String sql) { return jdbc.queryForObject(sql, Integer.class); }

    public List<Map<String, Object>> orderStats() { return rows("""
            select to_char(o.order_date, 'YYYY-MM') as period,
                   p.external_name as project_name,
                   c.name as customer_name,
                   c.region,
                   o.currency,
                   sum(o.amount) as amount,
                   count(*) as order_count,
                   sum(o.quantity) as product_quantity
            from kpm_orders o join kpm_projects p on p.id=o.project_id join kpm_customers c on c.id=o.customer_id
            group by period, p.external_name, c.name, c.region, o.currency
            order by period, p.external_name
            """); }

    public List<Map<String, Object>> resourceMap() { return rows("""
            select c.id as customer_id, c.name as customer_name, c.region, c.address, c.level, c.status,
                   (select string_agg(distinct coalesce(u.name, co.owner_name), ', ')
                    from kpm_customer_owners co
                    left join kpm_users u on u.id = co.owner_user_id or (co.owner_user_id is null and u.name = co.owner_name)
                    where co.customer_id=c.id and co.owner_type='sales') as sales_owners,
                   (select string_agg(distinct coalesce(u.name, co.owner_name), ', ')
                    from kpm_customer_owners co
                    left join kpm_users u on u.id = co.owner_user_id or (co.owner_user_id is null and u.name = co.owner_name)
                    where co.customer_id=c.id and co.owner_type='support') as support_owners,
                   (select string_agg(distinct p.external_name, ', ')
                    from kpm_project_customers pc
                    join kpm_projects p on p.id=pc.project_id
                    where pc.customer_id=c.id) as projects,
                   (select coalesce(sum(o.quantity), 0)
                    from kpm_orders o
                    where o.customer_id=c.id) as ordered_quantity
            from kpm_customers c
            order by c.region, c.name
            """); }

    public List<Map<String, Object>> geocodeCache(String query) {
        return rows("select * from kpm_geocode_cache where query=?", query);
    }

    public void upsertGeocodeCache(String query, double latitude, double longitude, String displayName, String provider, String precision) {
        update("""
                insert into kpm_geocode_cache (query, latitude, longitude, display_name, provider, precision, updated_at)
                values (?, ?, ?, ?, ?, ?, current_timestamp)
                on conflict (query) do update set
                  latitude=excluded.latitude,
                  longitude=excluded.longitude,
                  display_name=excluded.display_name,
                  provider=excluded.provider,
                  precision=excluded.precision,
                  updated_at=current_timestamp
                """, query, latitude, longitude, displayName, provider, precision);
    }

    public List<Map<String, Object>> support(String customerId) { return rows("""
            select c.id as customer_id, c.name as customer_name, coalesce(u.name, co.owner_name) as support_owner,
                   count(t.id) filter (where t.status not in ('已完成','已拒绝') and t.category='需求') as open_requirement_count,
                   count(t.id) filter (where t.status not in ('已完成','已拒绝') and t.category='Bug') as open_bug_count,
                   count(t.id) filter (where t.status not in ('已完成','已拒绝') and t.category not in ('需求','Bug')) as open_other_count,
                   count(t.id) filter (where t.blocked = true) as blocked_count
            from kpm_customers c
            join kpm_customer_owners co on co.customer_id=c.id and co.owner_type='support'
            left join kpm_users u on u.id = co.owner_user_id or (co.owner_user_id is null and u.name = co.owner_name)
            left join kpm_tasks t on t.customer_id=c.id and exists (
                select 1 from kpm_task_assignees ta
                where ta.task_id=t.id and (ta.user_id = co.owner_user_id or (ta.user_id is null and ta.assignee_name = coalesce(u.name, co.owner_name)))
            )
            where (? = '' or c.id = ?)
            group by c.id, c.name, coalesce(u.name, co.owner_name)
            order by c.name, coalesce(u.name, co.owner_name)
            """, customerId, customerId); }

    public List<Map<String, Object>> activity() { return rows("""
            select c.id, c.name, c.region, c.level, c.status,
                   max(cf.created_at) as last_followup_at,
                   max(o.order_date) as last_order_date,
                   count(distinct t.id) filter (where t.status not in ('已完成','已拒绝')) as open_task_count,
                   count(distinct pc.project_id) as project_count
            from kpm_customers c
            left join kpm_customer_followups cf on cf.customer_id=c.id
            left join kpm_orders o on o.customer_id=c.id
            left join kpm_tasks t on t.customer_id=c.id
            left join kpm_project_customers pc on pc.customer_id=c.id
            group by c.id, c.name, c.region, c.level, c.status
            order by c.name
            """); }
}
