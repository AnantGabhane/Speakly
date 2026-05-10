declare module "@vercel/blob/client" {
  import type { IncomingMessage } from "node:http";

  type BlobAccessType = "public" | "private";
  type PutBody = string | ArrayBuffer | Blob | File | ReadableStream | Buffer;

  export type PutBlobResult = {
    url: string;
    downloadUrl: string;
    pathname: string;
    contentType: string;
    contentDisposition: string;
  };

  type UploadProgressEvent = {
    loaded: number;
    total: number;
    percentage: number;
  };

  export type UploadOptions = {
    access: BlobAccessType;
    handleUploadUrl: string;
    contentType?: string;
    clientPayload?: string;
    headers?: Record<string, string>;
    multipart?: boolean;
    abortSignal?: AbortSignal;
    onUploadProgress?: (event: UploadProgressEvent) => void;
  };

  export function upload(
    pathname: string,
    body: PutBody,
    optionsInput: UploadOptions,
  ): Promise<PutBlobResult>;

  export type HandleUploadBody =
    | {
        type: "blob.generate-client-token";
        payload: {
          pathname: string;
          multipart: boolean;
          clientPayload: string | null;
        };
      }
    | {
        type: "blob.upload-completed";
        payload: {
          blob: PutBlobResult;
          tokenPayload?: string | null;
        };
      };

  export type HandleUploadOptions = {
    body: HandleUploadBody;
    request: IncomingMessage | Request;
    token?: string;
    onBeforeGenerateToken: (
      pathname: string,
      clientPayload: string | null,
      multipart: boolean,
    ) => Promise<{
      allowedContentTypes?: string[];
      maximumSizeInBytes?: number;
      validUntil?: number;
      addRandomSuffix?: boolean;
      allowOverwrite?: boolean;
      cacheControlMaxAge?: number;
      ifMatch?: string;
      tokenPayload?: string | null;
      callbackUrl?: string;
    }>;
    onUploadCompleted?: (
      body: Extract<HandleUploadBody, { type: "blob.upload-completed" }>["payload"],
    ) => Promise<void>;
  };

  export function handleUpload(
    options: HandleUploadOptions,
  ): Promise<
    | {
        type: "blob.generate-client-token";
        clientToken: string;
      }
    | {
        type: "blob.upload-completed";
        response: "ok";
      }
  >;
}
