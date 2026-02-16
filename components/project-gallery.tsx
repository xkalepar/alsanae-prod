"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ProjectGalleryProps {
  images: string[];
}

export function ProjectGallery({ images }: ProjectGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const nextImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage + 1) % images.length);
    }
  };

  const prevImage = () => {
    if (selectedImage !== null) {
      setSelectedImage(
        selectedImage === 0 ? images.length - 1 : selectedImage - 1,
      );
    }
  };

  if (!images || images.length === 0) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="mb-12"
    >
      <Card>
        <CardHeader>
          <CardTitle>Project Gallery</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {images.map((image, index) => (
              <Dialog key={index}>
                <DialogTrigger asChild>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="relative h-48 rounded-lg overflow-hidden cursor-pointer group"
                    onClick={() => setSelectedImage(index)}
                  >
                    <Image
                      src={image || "/placeholder.svg?height=300&width=400"}
                      alt={`Project image ${index + 1}`}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                  </motion.div>
                </DialogTrigger>
                <DialogContent className="max-w-4xl w-full p-0">
                  <div className="relative">
                    <Image
                      src={image || "/placeholder.svg?height=600&width=800"}
                      alt={`Project image ${index + 1}`}
                      width={800}
                      height={600}
                      className="w-full h-auto"
                    />

                    {/* Navigation buttons */}
                    {images.length > 1 && (
                      <>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white"
                          onClick={(e) => {
                            e.stopPropagation();
                            prevImage();
                          }}
                        >
                          <ChevronLeft className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white"
                          onClick={(e) => {
                            e.stopPropagation();
                            nextImage();
                          }}
                        >
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </>
                    )}

                    {/* Image counter */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                      {index + 1} / {images.length}
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
