import 'maplibre-gl/dist/maplibre-gl.css';
import maplibregl, { LngLatBounds } from 'maplibre-gl';
import { Empty } from 'antd';
import { useEffect, useMemo, useRef } from 'react';
import type { AnyRecord } from '../../types';

type ResourceDistributionMapProps = {
  points: AnyRecord[];
};

type MapPoint = AnyRecord & {
  longitude: number;
  latitude: number;
};

function validNumber(value: unknown) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
}

function escapeHtml(value: unknown) {
  return String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

export function ResourceDistributionMap({ points }: ResourceDistributionMapProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);
  const markersRef = useRef<maplibregl.Marker[]>([]);

  const normalizedPoints = useMemo<MapPoint[]>(() => points
    .map((item) => {
      const longitude = validNumber(item.longitude);
      const latitude = validNumber(item.latitude);
      return longitude === null || latitude === null ? null : { ...item, longitude, latitude };
    })
    .filter((item): item is MapPoint => item !== null), [points]);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;
    mapRef.current = new maplibregl.Map({
      container: containerRef.current,
      style: 'https://demotiles.maplibre.org/style.json',
      center: [18, 18],
      zoom: 1.15,
      attributionControl: false,
    });
    mapRef.current.addControl(new maplibregl.NavigationControl({ visualizePitch: true }), 'top-right');
    mapRef.current.addControl(new maplibregl.FullscreenControl(), 'top-right');
    mapRef.current.addControl(new maplibregl.AttributionControl({ compact: true }), 'bottom-left');
    return () => {
      markersRef.current.forEach((marker) => marker.remove());
      markersRef.current = [];
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, []);

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    markersRef.current.forEach((marker) => marker.remove());
    markersRef.current = [];
    if (!normalizedPoints.length) return;

    const bounds = new LngLatBounds();
    normalizedPoints.forEach((item) => {
      const element = document.createElement('button');
      element.className = 'kpm-map-marker';
      element.type = 'button';
      const displayName = item.customerName || item.name || '客户';
      element.title = String(displayName);
      element.innerHTML = `<span>${escapeHtml(String(displayName).slice(0, 1))}</span>`;
      const popup = new maplibregl.Popup({ offset: 18 }).setHTML(`
        <div class="kpm-map-popup">
          <strong>${escapeHtml(displayName)}</strong>
          <p>${escapeHtml(item.region || item.address || '未知地区')}</p>
          <small>销售：${escapeHtml(item.salesOwners || '-')}<br/>技术支持：${escapeHtml(item.supportOwners || '-')}</small>
          <small>项目：${escapeHtml(item.projects || '-')}</small>
        </div>
      `);
      const marker = new maplibregl.Marker({ element })
        .setLngLat([item.longitude, item.latitude])
        .setPopup(popup)
        .addTo(map);
      markersRef.current.push(marker);
      bounds.extend([item.longitude, item.latitude]);
    });

    if (!bounds.isEmpty()) {
      map.fitBounds(bounds, { padding: 72, maxZoom: 4.8, duration: 700 });
    }
  }, [normalizedPoints]);

  if (!normalizedPoints.length) {
    return <div className="kpm-map-empty"><Empty description="暂无可展示的地理坐标，客户地址完成地理编码后会显示在地图上" /></div>;
  }

  return <div ref={containerRef} className="kpm-maplibre" />;
}
