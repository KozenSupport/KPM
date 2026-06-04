import { kpmApi } from '../services/kpmApi';
import type { AnyRecord } from '../types';

export type UploadLike = {
  originFileObj?: File;
  name?: string;
};

export function normalizeUploadFiles(value: unknown): File[] {
  if (!Array.isArray(value)) return [];
  return value
    .map((item) => (item instanceof File ? item : (item as UploadLike).originFileObj))
    .filter((file): file is File => Boolean(file));
}

export async function uploadBusinessFiles(files: File[], category: string, businessId: string, uploader: string): Promise<AnyRecord[]> {
  const uploaded = await Promise.all(files.map((file) => kpmApi.uploadFile(file, category, businessId, uploader)));
  return uploaded.map((item) => ({
    fileName: item.fileName || item.name,
    fileType: item.fileType || item.type || item.contentType,
    fileSize: item.size || `${item.bytes || 0} B`,
    uploader: item.uploader || uploader,
    bucket: item.bucket,
    objectKey: item.objectKey,
    storageUrl: item.storageUrl,
    category,
    storageCategory: category,
  }));
}

export async function downloadBusinessFile(file: AnyRecord): Promise<void> {
  const objectKey = file.objectKey || file.storageKey;
  if (!objectKey) {
    throw new Error('文件缺少 objectKey，无法生成下载链接');
  }
  const result = await kpmApi.downloadUrl(objectKey, file.fileName || file.name);
  const url = result.downloadUrl || result.url;
  if (!url) {
    throw new Error('文件下载链接生成失败');
  }
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = file.fileName || file.name || 'download';
  anchor.rel = 'noopener noreferrer';
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
}
