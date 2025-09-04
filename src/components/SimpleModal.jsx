import React from 'react';
import { X } from 'lucide-react';

const SimpleModal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-xl p-6 relative max-w-md w-full mx-4">
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          <X className="w-6 h-6" />
        </button>
        {children}
      </div>
    </div>
  );
};


<Dialog open={isHelplineOpen} onOpenChange={setHelplineOpen}>
  <DialogContent className="bg-white rounded-xl p-6 text-center">
    <DialogHeader>
      <DialogTitle className="text-2xl font-bold mb-4">Emergency Contact</DialogTitle>
      <DialogDescription className="text-lg text-gray-700">
        Emergency contact number:
      </DialogDescription>
    </DialogHeader>
    <div className="mt-4">
      <a 
        href="tel:+919734569921" 
        className="text-blue-600 text-xl font-semibold hover:underline"
      >
        +91 9734569921
      </a>
    </div>
    <DialogFooter className="mt-6">
      <Button onClick={() => setHelplineOpen(false)} variant="outline">
        Close
      </Button>
    </DialogFooter>
  </DialogContent>
</Dialog>

export default SimpleModal;
