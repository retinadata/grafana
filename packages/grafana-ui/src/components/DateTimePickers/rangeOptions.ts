import { t } from 'ttag';
import { TimeOption } from '@grafana/data';

export const quickOptions: TimeOption[] = [
  { from: 'now-5m', to: 'now', display: t`Last 5 minutes` },
  { from: 'now-15m', to: 'now', display: t`Last 15 minutes` },
  { from: 'now-30m', to: 'now', display: t`Last 30 minutes` },
  { from: 'now-1h', to: 'now', display: t`Last 1 hour` },
  { from: 'now-3h', to: 'now', display: t`Last 3 hours` },
  { from: 'now-6h', to: 'now', display: t`Last 6 hours` },
  { from: 'now-12h', to: 'now', display: t`Last 12 hours` },
  { from: 'now-24h', to: 'now', display: t`Last 24 hours` },
  { from: 'now-2d', to: 'now', display: t`Last 2 days` },
  { from: 'now-7d', to: 'now', display: t`Last 7 days` },
  { from: 'now-30d', to: 'now', display: t`Last 30 days` },
  { from: 'now-90d', to: 'now', display: t`Last 90 days` },
  { from: 'now-6M', to: 'now', display: t`Last 6 months` },
  { from: 'now-1y', to: 'now', display: t`Last 1 year` },
  { from: 'now-2y', to: 'now', display: t`Last 2 years` },
  { from: 'now-5y', to: 'now', display: t`Last 5 years` },
];

export const otherOptions: TimeOption[] = [
  { from: 'now-1d/d', to: 'now-1d/d', display: t`Yesterday` },
  { from: 'now-2d/d', to: 'now-2d/d', display: t`Day before yesterday` },
  { from: 'now-7d/d', to: 'now-7d/d', display: t`This day last week` },
  { from: 'now-1w/w', to: 'now-1w/w', display: t`Previous week` },
  { from: 'now-1M/M', to: 'now-1M/M', display: t`Previous month` },
  { from: 'now-1y/y', to: 'now-1y/y', display: t`Previous year` },
  { from: 'now/d', to: 'now/d', display: t`Today` },
  { from: 'now/d', to: 'now', display: t`Today so far` },
  { from: 'now/w', to: 'now/w', display: t`This week` },
  { from: 'now/w', to: 'now', display: t`This week so far` },
  { from: 'now/M', to: 'now/M', display: t`This month` },
  { from: 'now/M', to: 'now', display: t`This month so far` },
  { from: 'now/y', to: 'now/y', display: t`This year` },
  { from: 'now/y', to: 'now', display: t`This year so far` },
];
