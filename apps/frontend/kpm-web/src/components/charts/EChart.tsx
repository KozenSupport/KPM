import * as echarts from 'echarts';
import { useEffect, useRef } from 'react';

export type EChartProps = {
  option: echarts.EChartsCoreOption;
  height?: number | string;
  className?: string;
};

export function EChart({ option, height = 360, className }: EChartProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const chartRef = useRef<echarts.ECharts | null>(null);

  useEffect(() => {
    if (!ref.current) return;
    chartRef.current = echarts.init(ref.current, undefined, { renderer: 'canvas' });
    const resizeObserver = new ResizeObserver(() => chartRef.current?.resize());
    resizeObserver.observe(ref.current);
    return () => {
      resizeObserver.disconnect();
      chartRef.current?.dispose();
      chartRef.current = null;
    };
  }, []);

  useEffect(() => {
    chartRef.current?.setOption(option, true);
  }, [option]);

  return <div ref={ref} className={className} style={{ width: '100%', height }} />;
}
