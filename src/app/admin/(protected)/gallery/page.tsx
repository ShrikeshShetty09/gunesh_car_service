"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { Trash2, Eye, EyeOff, Upload, Loader2, Plus } from "lucide-react";

type GalleryImage = {
  id: string; url: string; isHidden: boolean; order: number;
};

export default function AdminGalleryPage() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  async function fetchImages() {
    setLoading(true);
    const res = await fetch("/api/gallery/admin");
    const data = await res.json();
    setImages(data);
    setLoading(false);
  }

  useEffect(() => { fetchImages(); }, []);

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    setUploading(true);
    for (const file of files) {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/gallery/upload", { method: "POST", body: formData });
      if (!res.ok) console.error("Upload failed for", file.name);
    }
    setUploading(false);
    fetchImages();
    if (fileRef.current) fileRef.current.value = "";
  }

  async function toggleHide(id: string, current: boolean) {
    await fetch(`/api/gallery/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isHidden: !current }),
    });
    fetchImages();
  }

  async function deleteImage(id: string) {
    if (!confirm("Delete this image?")) return;
    await fetch(`/api/gallery/${id}`, { method: "DELETE" });
    fetchImages();
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start flex-wrap gap-4">
        <div>
          <h1 className="font-outfit text-3xl font-bold text-white mb-1">Gallery</h1>
          <p className="text-gray-400">Manage website gallery images</p>
        </div>
        <button
          onClick={() => fileRef.current?.click()}
          disabled={uploading}
          className="flex items-center gap-2 bg-amber-500 text-black font-bold px-5 py-3 rounded-xl hover:bg-amber-400 transition-colors disabled:opacity-60"
        >
          {uploading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Plus className="w-5 h-5" />}
          {uploading ? "Uploading..." : "Upload Images"}
        </button>
        <input ref={fileRef} type="file" accept="image/*" multiple className="hidden" onChange={handleUpload} />
      </div>

      {loading ? (
        <div className="flex justify-center py-24"><Loader2 className="w-8 h-8 animate-spin text-amber-500" /></div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((img) => (
            <div key={img.id} className={`relative group rounded-2xl overflow-hidden border transition-all ${img.isHidden ? "border-white/5 opacity-50" : "border-white/10"}`}>
              <div className="aspect-square relative">
                <Image
                  src={img.url}
                  alt="Gallery"
                  fill
                  className="object-cover transition-transform group-hover:scale-105 duration-500"
                  unoptimized={img.url.startsWith("http")}
                />
              </div>
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                <button
                  onClick={() => toggleHide(img.id, img.isHidden)}
                  className="p-2.5 bg-white/10 backdrop-blur rounded-xl text-white hover:bg-white/20 transition-colors"
                  title={img.isHidden ? "Show" : "Hide"}
                >
                  {img.isHidden ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
                </button>
                <button
                  onClick={() => deleteImage(img.id)}
                  className="p-2.5 bg-red-500/20 backdrop-blur rounded-xl text-red-400 hover:bg-red-500/40 transition-colors"
                  title="Delete"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
              {img.isHidden && (
                <div className="absolute top-2 right-2 bg-black/70 text-gray-400 text-xs px-2 py-1 rounded-full">Hidden</div>
              )}
            </div>
          ))}
          {images.length === 0 && (
            <div className="col-span-full flex flex-col items-center justify-center py-20 text-gray-500">
              <Upload className="w-12 h-12 mb-4 opacity-30" />
              <p>No images yet. Upload some!</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
