"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { QRCodeSVG } from "qrcode.react";
import { Download } from "lucide-react";
import { checkGooglePlaceIdAndAlert, downloadQRCode } from "@/lib/utils";

interface QRCodePreviewDialogProps {
  isOpen: boolean;
  onClose: () => void;
  qrType: {
    id: string;
    title: string;
  } | null;
  qrUrl: string;
  qrRefs: React.MutableRefObject<{ [key: string]: HTMLDivElement | null }>;
  googlePlaceId?: string;
}

const QRCodePreviewDialog = ({
  isOpen,
  onClose,
  qrType,
  qrUrl,
  qrRefs,
  googlePlaceId,
}: QRCodePreviewDialogProps) => {
  if (!qrType) return null;

  const handleDownload = () => {
    if (!checkGooglePlaceIdAndAlert(qrType.id, googlePlaceId)) {
      return;
    }
    downloadQRCode(qrType.id, qrRefs, true, "-dialog");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
        <DialogTitle className="text-xl font-semibold">
          QR Code - {qrType.title}
        </DialogTitle>
        <div className="w-full flex flex-col items-center">
          <div
            className="my-4"
            ref={(el) => {
              qrRefs.current[`${qrType.id}-dialog`] = el;
            }}
          >
            <QRCodeSVG
              value={qrUrl}
              size={220}
              bgColor="#ffffff"
              fgColor="#22223b"
              level="M"
            />
          </div>
          <div className="text-center mt-2">
            <div className="font-semibold">URL cible:</div>
            <div className="text-gray-500 text-sm">{qrUrl}</div>
          </div>
          <Button
            className="w-full mt-8 text-lg py-6 flex items-center justify-center"
            onClick={handleDownload}
          >
            <Download className="w-5 h-5 mr-2" />
            Télécharger le QR Code
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default QRCodePreviewDialog;
