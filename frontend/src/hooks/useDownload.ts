import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { resolveMedia, generateQR, MediaMetadata } from '../lib/api';
import { isValidUrl } from '../lib/utils';
import toast from 'react-hot-toast';

export function useDownload() {
  const [result, setResult] = useState<MediaMetadata | null>(null);
  const [qrCode, setQrCode] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const mutation = useMutation({
    mutationFn: resolveMedia,
    onSuccess: (data) => {
      setResult(data);
      setError(null);
    },
    onError: (err: unknown) => {
      const axiosErr = err as { response?: { data?: { error?: { message?: string } } } };
      const msg = axiosErr?.response?.data?.error?.message || 'Failed to process URL';
      setError(msg);
      setResult(null);
      toast.error(msg);
    },
  });

  const qrMutation = useMutation({
    mutationFn: generateQR,
    onSuccess: (data) => setQrCode(data),
    onError: () => toast.error('Failed to generate QR code'),
  });

  function submit(url: string) {
    if (!url.trim()) { toast.error('Please paste a video URL'); return; }
    if (!isValidUrl(url.trim())) { toast.error('Please enter a valid URL'); return; }
    setError(null);
    setQrCode(null);
    mutation.mutate(url.trim());
  }

  function requestQR(url: string) {
    qrMutation.mutate(url);
  }

  function reset() {
    setResult(null);
    setError(null);
    setQrCode(null);
  }

  return {
    submit,
    requestQR,
    reset,
    result,
    qrCode,
    error,
    isLoading: mutation.isPending,
    isQrLoading: qrMutation.isPending,
  };
}
