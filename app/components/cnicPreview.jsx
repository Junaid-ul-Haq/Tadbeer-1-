"use client";
import { useEffect, useState } from "react";
import { fetchSecureFile } from "@/services/fileService";

export default function CNICPreview({ cnicFront, cnicBack, token }) {
  const [frontUrl, setFrontUrl] = useState(null);
  const [backUrl, setBackUrl] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  useEffect(() => {
    const loadFiles = async () => {
      if (cnicFront) {
        const url = await fetchSecureFile(cnicFront, token);
        if (url) setFrontUrl(url);
      }
      if (cnicBack) {
        const url = await fetchSecureFile(cnicBack, token);
        if (url) setBackUrl(url);
      }
    };
    loadFiles();
  }, [cnicFront, cnicBack, token]);

  return (
    <>
      {/* CNIC Container */}
      <div className="flex flex-wrap justify-center md:justify-start gap-8 mt-6 overflow-x-auto md:overflow-visible p-2">
        {/* CNIC Front */}
        <div className="flex flex-col items-center space-y-3">
          <p className="font-semibold text-sm md:text-base text-gray-200">
            CNIC Front
          </p>
          {frontUrl ? (
            <div
              className="w-[220px] h-[140px] md:w-[260px] md:h-[160px] border border-gray-700 rounded-xl shadow-md overflow-hidden flex items-center justify-center bg-gray-900 cursor-pointer hover:scale-105 transition-transform"
              onClick={() => setPreviewUrl(frontUrl)}
            >
              <img
                src={frontUrl}
                alt="CNIC Front"
                className="object-cover w-full h-full"
              />
            </div>
          ) : (
            <p className="text-gray-500 text-sm">No CNIC Front Found</p>
          )}
        </div>

        {/* CNIC Back */}
        <div className="flex flex-col items-center space-y-3">
          <p className="font-semibold text-sm md:text-base text-gray-200">
            CNIC Back
          </p>
          {backUrl ? (
            <div
              className="w-[220px] h-[140px] md:w-[260px] md:h-[160px] border border-gray-700 rounded-xl shadow-md overflow-hidden flex items-center justify-center bg-gray-900 cursor-pointer hover:scale-105 transition-transform"
              onClick={() => setPreviewUrl(backUrl)}
            >
              <img
                src={backUrl}
                alt="CNIC Back"
                className="object-cover w-full h-full"
              />
            </div>
          ) : (
            <p className="text-gray-500 text-sm">No CNIC Back Found</p>
          )}
        </div>
      </div>

      {/* Preview Modal */}
      {previewUrl && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 overflow-auto"
          onClick={() => setPreviewUrl(null)}
        >
          <img
            src={previewUrl}
            alt="Preview"
            className="max-h-[90vh] max-w-[90vw] rounded-lg shadow-lg border-2 border-white object-contain"
          />
        </div>
      )}
    </>
  );
}
