import { Card, Col, Input, Row, Select, Space, Statistic, Table, Tag } from 'antd';
import { useMemo, useState } from 'react';
import { CustomerSelect } from '../../components/common/CustomerSelect';
import { DataState } from '../../components/common/DataState';
import { ResourceDistributionMap } from '../../components/maps/ResourceDistributionMap';
import { useKpmData } from '../../hooks/useKpmData';
import type { AnyRecord } from '../../types';
import { includesKeyword } from '../../utils/format';

export function ResourceMapAnalyticsPage() {
  const { data, isLoading, error } = useKpmData();
  const [regions, setRegions] = useState<string[]>([]);
  const [customerIds, setCustomerIds] = useState<string[]>([]);
  const [detailKeyword, setDetailKeyword] = useState('');
  const rows = useMemo(() => (data?.resourceMap || []).filter((row: AnyRecord) => {
    const regionOk = !regions.length || regions.includes(row.region);
    const customerOk = !customerIds.length || customerIds.includes(row.customerId);
    return regionOk && customerOk;
  }), [customerIds, data?.resourceMap, regions]);
  const detailRows = useMemo(() => rows.filter((row: AnyRecord) => includesKeyword([row.customerName, row.region, row.salesOwners, row.supportOwners, row.projects], detailKeyword)), [detailKeyword, rows]);
  const regionOptions = useMemo(() => [...new Set((data?.resourceMap || []).map((row: AnyRecord) => row.region).filter(Boolean))].map((region) => ({ label: region, value: region })), [data?.resourceMap]);
  const uniqueSales = useMemo(() => new Set(rows.flatMap((row: AnyRecord) => String(row.salesOwners || '').split(/[,，、]/).map((item) => item.trim()).filter(Boolean))).size, [rows]);
  const uniqueSupport = useMemo(() => new Set(rows.flatMap((row: AnyRecord) => String(row.supportOwners || '').split(/[,，、]/).map((item) => item.trim()).filter(Boolean))).size, [rows]);
  const uniqueProjects = useMemo(() => new Set(rows.flatMap((row: AnyRecord) => String(row.projects || '').split(/[,，、]/).map((item) => item.trim()).filter(Boolean))).size, [rows]);

  return (
    <DataState loading={isLoading} error={error}>
      <Card className="kpm-card kpm-filter-card">
        <Space wrap>
          <Select mode="multiple" allowClear maxTagCount="responsive" placeholder="筛选地区" value={regions} onChange={setRegions} options={regionOptions} style={{ minWidth: 320 }} />
          <CustomerSelect customers={data?.customers} mode="multiple" placeholder="筛选客户，支持搜索" value={customerIds} onChange={setCustomerIds} style={{ minWidth: 320 }} />
          <Tag color="blue">Map SDK: MapLibre GL JS</Tag>
          <Tag color="cyan">坐标来源：客户地址地理编码缓存</Tag>
        </Space>
      </Card>
      <Row gutter={[16, 16]}>
        <Col xs={24} md={6}><Card className="kpm-card"><Statistic title="客户数" value={rows.length} /></Card></Col>
        <Col xs={24} md={6}><Card className="kpm-card"><Statistic title="销售人员" value={uniqueSales} /></Card></Col>
        <Col xs={24} md={6}><Card className="kpm-card"><Statistic title="技术支持" value={uniqueSupport} /></Card></Col>
        <Col xs={24} md={6}><Card className="kpm-card"><Statistic title="售卖项目" value={uniqueProjects} /></Card></Col>
      </Row>
      <Card className="kpm-card kpm-section-row" title="全球资源分布地图">
        <ResourceDistributionMap points={rows} />
      </Card>
      <Card
        className="kpm-card kpm-section-row"
        title="地图数据明细"
        extra={<Input.Search allowClear placeholder="搜索客户 / 地区 / 人员 / 项目" onSearch={setDetailKeyword} onChange={(event) => setDetailKeyword(event.target.value)} style={{ width: 300 }} />}
      >
        <Table size="small" rowKey={(row: AnyRecord, index) => row.customerId || String(index)} pagination={{ pageSize: 8 }} dataSource={detailRows} columns={[
          { title: '客户', dataIndex: 'customerName', ellipsis: true },
          { title: '地区', dataIndex: 'region', ellipsis: true },
          { title: '销售', dataIndex: 'salesOwners', ellipsis: true },
          { title: '技术支持', dataIndex: 'supportOwners', ellipsis: true },
          { title: '项目', dataIndex: 'projects', ellipsis: true },
          { title: '产品数', dataIndex: 'orderedQuantity', width: 90 },
        ]} />
      </Card>
    </DataState>
  );
}
