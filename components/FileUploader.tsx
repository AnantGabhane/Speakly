"use client";

import { X } from "lucide-react";
import { useRef } from "react";
import type { FieldValues } from "react-hook-form";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import type { FileUploadFieldProps } from "@/types";

function FileUploader<T extends FieldValues>({
  control,
  name,
  label,
  acceptTypes,
  disabled,
  icon: Icon,
  placeholder,
  hint,
}: FileUploadFieldProps<T>) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        const fieldValue = field.value as unknown;
        const selectedFile = fieldValue instanceof File ? fieldValue : undefined;

        const setInputRef = (node: HTMLInputElement | null) => {
          inputRef.current = node;
          field.ref(node);
        };

        return (
          <FormItem>
            <FormLabel className="form-label">{label}</FormLabel>
            <FormControl>
              <div
                role="button"
                tabIndex={disabled ? -1 : 0}
                className={cn(
                  "upload-dropzone",
                  selectedFile && "upload-dropzone-uploaded",
                  disabled && "pointer-events-none opacity-60",
                )}
                onClick={() => inputRef.current?.click()}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    inputRef.current?.click();
                  }
                }}
              >
                <input
                  ref={setInputRef}
                  name={field.name}
                  type="file"
                  accept={acceptTypes.join(",")}
                  disabled={disabled}
                  className="sr-only"
                  onBlur={field.onBlur}
                  onChange={(event) => {
                    field.onChange(event.target.files?.[0]);
                  }}
                />

                {selectedFile ? (
                  <>
                    <button
                      type="button"
                      className="upload-dropzone-remove self-end mr-5"
                      disabled={disabled}
                      aria-label={`Remove ${label}`}
                      onClick={(event) => {
                        event.stopPropagation();
                        field.onChange(undefined);
                        if (inputRef.current) {
                          inputRef.current.value = "";
                        }
                      }}
                    >
                      <X aria-hidden="true" />
                    </button>
                    <Icon className="upload-dropzone-icon" aria-hidden="true" />
                    <p className="upload-dropzone-text">{selectedFile.name}</p>
                    <p className="upload-dropzone-hint">
                      {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                    </p>
                  </>
                ) : (
                  <>
                    <Icon className="upload-dropzone-icon" aria-hidden="true" />
                    <p className="upload-dropzone-text">{placeholder}</p>
                    <p className="upload-dropzone-hint">{hint}</p>
                  </>
                )}
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}

export default FileUploader;
